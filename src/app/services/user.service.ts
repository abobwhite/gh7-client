import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {ResponseEntity} from '../models/ResponseEntity';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<ResponseEntity<User>>(`/api/users/${username}`)
      .pipe(
        map((res) => plainToClass(User, res.body)),
        shareReplay(1)
      );
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<ResponseEntity<User>>('/api/users', user)
      .pipe(
        map((res) => plainToClass(User, res.body))
      );
  }
}
