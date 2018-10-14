import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {routerTransition} from '../registration/animations/router.transition';
import {Router} from '@angular/router';
import {faSun, faHandsHelping, faSignOutAlt, faUserCircle, faUserCog} from '@fortawesome/free-solid-svg-icons';
import {TranslateService} from '@ngx-translate/core';

@Component({
  animations: [routerTransition],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  faSun = faSun;
  faUserCircle = faUserCircle;
  faSignOutAlt = faSignOutAlt;
  faHandsHelping = faHandsHelping;
  faUserCog = faUserCog;

  constructor(public auth: AuthService, private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');
    auth.handleAuthentication();
  }

  getState(outlet) {
    return this.router.url;
    // return outlet.activatedRouteData.state;
  }
}
