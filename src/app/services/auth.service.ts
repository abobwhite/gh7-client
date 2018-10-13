import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as auth0 from 'auth0-js';
import {WebAuth} from 'auth0-js';
import {environment} from '../../environments/environment';
import {Auth0User} from '../models/Auth0User';
import {plainToClass} from 'class-transformer';
import {UserService} from './user.service';
import {User} from '../models/User';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {flatMap} from 'rxjs/operators';

// why do you need defining window as any?
// check this: https://github.com/aws/aws-amplify/issues/678#issuecomment-389106098
(window as any).global = window;

@Injectable()
export class AuthService {
  private auth0User: Auth0User;
  private authenticatedUser: User;
  private auth0Options: any;
  private auth0: WebAuth;

  constructor(private router: Router, private userService: UserService, private http: HttpClient) {
    this.auth0Options = {
      audience: environment.AUTH0_AUDIENCE,
      clientID: environment.AUTHO_CLIENT_ID,
      domain: environment.AUTH0_DOMAIN,
      responseType: 'token id_token',
      redirectUri: environment.AUTH0_REDIRECT_URL,
      scope: 'openid profile email'
    };

    this.auth0 = new auth0.WebAuth(this.auth0Options);
  }

  public login(): void {
    this.auth0.authorize(this.auth0Options);
  }

  public handleAuthentication(): void {
    this.auth0.parseHash(this.processAuthResult.bind(this));
  }

  private processAuthResult(err, authResult) {
    let route = '/dashboard';
    if (authResult && authResult.accessToken && authResult.idToken) {
      window.location.hash = '';
      this.setSession(authResult);
      this.loadUser();
      route = '/dashboard';
    } else if (!err) {
      if (this.accessToken) {
        this.loadUser();
      }
    } else {
      this.router.navigate(['/']);
      console.log(err);
    }
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    const host = environment.AUTH0_REDIRECT_URL;
    const logoutUrl = `https://${environment.AUTH0_DOMAIN}/v2/logout?client_id=${environment.AUTHO_CLIENT_ID}&returnTo=${host}`;
    window.location.href = logoutUrl;
  }

  public get accessToken(): string {
    return localStorage.getItem('access_token');
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getAuth0User(): Observable<Auth0User> {
    const subject: ReplaySubject<Auth0User> = new ReplaySubject<Auth0User>();
    if (this.auth0User) {
      subject.next(this.auth0User);
      subject.complete();
    } else {
      this.auth0.client.userInfo(this.accessToken, (err, authResult): void => {
        if (!err) {
          this.auth0User = plainToClass(Auth0User, authResult);
          subject.next(this.auth0User);
        } else {
          subject.error(`Could not get user info for token ${this.accessToken}`);
        }

        subject.complete();
      });
    }

    return subject.asObservable();
  }

  public getAuthenticatedUser(): Observable<User> {
    const subject: ReplaySubject<User> = new ReplaySubject<User>();

    if (this.authenticatedUser) {
      subject.next(this.authenticatedUser);
      subject.complete();
    } else {
      this.userService.getUserById(this.auth0User.sub)
        .subscribe((user: User) => {
          this.authenticatedUser = user;
          subject.next(this.authenticatedUser);
          subject.complete();
        }, (err) => {
          subject.error(err);
          subject.complete();
        });
    }

    return subject.asObservable();
  }

  private loadUser(): void {
    this.getAuth0User()
      .pipe(
        flatMap(this.getAuthenticatedUser.bind(this)),
      ).subscribe(
      (user: User) => {
        this.authenticatedUser = user;
        this.router.navigate(['dashboard']);
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['profile']);
      });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }
}
