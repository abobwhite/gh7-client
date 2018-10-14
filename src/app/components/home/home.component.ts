import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {faGlobeAfrica} from '@fortawesome/free-solid-svg-icons';
import {faUserSecret} from '@fortawesome/free-solid-svg-icons';
import {faAmbulance} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-welcome',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  faGlobeAfrica = faGlobeAfrica;
  faUserSecret = faUserSecret;
  faAmbulance = faAmbulance;

  constructor(private auth: AuthService) {

  }

  loginOrRegister(): void {
    this.auth.login();
  }
}
