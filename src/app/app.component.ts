import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gh7-client-test';
  status: Observable<string>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.status = this.http.get<string>('/api/actuator/health').pipe(map((info: any) => info.status));
  }
}
