import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as auth0 from 'auth0-js';
import {environment} from '../../environments/environment';
import {Auth0User} from '../models/Auth0User';
import {plainToClass} from 'class-transformer';
import {UserService} from './user.service';
import {User} from '../models/User';
import {HttpErrorResponse} from '@angular/common/http';

// why do you need defining window as any?
// check this: https://github.com/aws/aws-amplify/issues/678#issuecomment-389106098
(window as any).global = window;

@Injectable()
export class AuthService {
  authenticatedUser: User;
  auth0User: Auth0User;

  auth0 = new auth0.WebAuth({
    clientID: environment.AUTHO_CLIENT_ID,
    domain: environment.AUTH0_DOMAIN,
    responseType: 'token id_token',
    redirectUri: environment.AUTH0_REDIRECT_URL,
    scope: 'openid profile email'
  });

  constructor(private router: Router, private userService: UserService) {
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
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
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  private loadUser(): void {
    this.auth0.client.userInfo(this.accessToken, (err, authResult): void => {
      if (!err) {
        this.auth0User = plainToClass(Auth0User, authResult);
        this.loadAuthenticatedUser();
      } else {
        // TODO: Handle error
        console.error(`Could not get user info for token ${this.accessToken}`);
      }
    });
  }

  private loadAuthenticatedUser(): void {
    this.userService.getUserByUsername(this.auth0User.email)
      .subscribe(
        (user: User) => {
          this.authenticatedUser = user;
          this.router.navigate(['dashboard']);
        },
        (error: HttpErrorResponse) => this.router.navigate(['register'])
      );
  }

  private get accessToken(): string {
    return localStorage.getItem('access_token');
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }
}
