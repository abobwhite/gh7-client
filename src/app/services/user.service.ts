import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map, shareReplay} from 'rxjs/operators';
import {classToPlain, plainToClass} from 'class-transformer';
import {ResponseEntity} from '../models/ResponseEntity';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<ResponseEntity<User>>(`/api/users/${encodeURIComponent(id)}`)
      .pipe(
        map((user) => {
          return plainToClass(User, user);
        }),
        catchError((err) => {
          console.error(err);
          return throwError(err);
        }),
        shareReplay(1)
      );
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<ResponseEntity<User>>('/api/users', classToPlain(user))
      .pipe(
        map((res) => plainToClass(User, res))
      );
  }

  updateUser(userId: string, changedProps: any): Observable<User> {
    return this.httpClient.patch<ResponseEntity<User>>(`/api/users/${encodeURIComponent(userId)}`, changedProps)      .pipe(
        map((res) => plainToClass(User, res))
      );
  }
}
