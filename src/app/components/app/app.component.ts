import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {routerTransition} from '../registration/animations/router.transition';
import {Router} from '@angular/router';
import {faBroadcastTower, faUserCircle, faSignOutAlt, faHandsHelping, faUserCog} from '@fortawesome/free-solid-svg-icons';

@Component({
  animations: [routerTransition],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faBroadcastTower = faBroadcastTower;
  faUserCircle = faUserCircle;
  faSignOutAlt = faSignOutAlt;
  faHandsHelping = faHandsHelping;
  faUserCog = faUserCog;

  constructor(public auth: AuthService, private router: Router) {
    auth.handleAuthentication();
  }

  getState(outlet) {
    return this.router.url;
    // return outlet.activatedRouteData.state;
  }
}
