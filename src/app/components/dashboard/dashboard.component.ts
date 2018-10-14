import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {User} from '../../models/User';
import {faHandsHelping} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faHandsHelping = faHandsHelping;
  user$: Observable<User>;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.user$ = this.auth.getAuthenticatedUser();
  }
}
