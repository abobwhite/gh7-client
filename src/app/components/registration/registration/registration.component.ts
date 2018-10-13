import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../animations/router.transition';

@Component({
  animations: [routerTransition],
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
