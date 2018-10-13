import {Component, OnInit} from '@angular/core';

@Component({
  // animations: [routerTransition],
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
