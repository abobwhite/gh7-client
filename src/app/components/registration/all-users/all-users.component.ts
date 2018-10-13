import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {routerTransition} from '../animations/router.transition';

@Component({
  animations: [routerTransition],
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  allUsersFormGroup: FormGroup;

  givenName: string;
  familyName: string;
  phoneNumber: number;

  knownLanguages: any = [];
  requiresTranslationOrCulturalAid: boolean;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.allUsersFormGroup = this.formBuilder.group({
      givenNameControl: [this.givenName, Validators.required],
      familyNameControl: [this.familyName, Validators.required],
      phoneNumberControl: [this.phoneNumber, Validators.required]
    });
  }

  register() {

  }

}
