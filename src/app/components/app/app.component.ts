import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {routerTransition} from '../registration/animations/router.transition';
import {Router} from '@angular/router';

@Component({
  animations: [routerTransition],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthService,
              private router: Router) {
    auth.handleAuthentication();
  }

  getState(outlet) {
    return this.router.url;
    // return outlet.activatedRouteData.state;
  }
}
