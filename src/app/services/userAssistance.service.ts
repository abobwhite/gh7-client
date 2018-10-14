import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserAssistanceRequest} from '../models/UserAssistanceRequest';
import {Observable} from 'rxjs';

@Injectable()
export class UserAssistanceService {
  constructor(private http: HttpClient) {
  }

  createRequest(request: UserAssistanceRequest): Observable<UserAssistanceRequest> {
    return this.http.post<UserAssistanceRequest>('/api/assistance/request', request);
  }
}
