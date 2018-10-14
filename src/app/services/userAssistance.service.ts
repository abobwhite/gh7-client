import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserAssistanceRequest} from '../models/UserAssistanceRequest';
import {Observable} from 'rxjs';

@Injectable()
export class UserAssistanceService {
  constructor(private http: HttpClient) {
  }

  createEmergencyRequest(request: UserAssistanceRequest): Observable<void> {
    return this.http.post<void>('/api/assistance/request', request);
  }

  createPhoneRequest(): Observable<void> {
    return this.http.post<void>('/api/assistance/phonehelp', {});
  }
}
