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
  preferredLanguage: string;

  knownLanguages: any = [];
  requiresTranslationOrCulturalAid: boolean;
  interestedInTranslationOrCulturalAidForOthers: boolean;

  languageList: any = [];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.setupLanguageList();

    this.allUsersFormGroup = this.formBuilder.group({
      givenNameControl: [this.givenName, Validators.required],
      familyNameControl: [this.familyName, Validators.required],
      phoneNumberControl: [this.phoneNumber, Validators.required],
      knownLanguageControl: [this.knownLanguages],
      preferredLanguageControl: [this.preferredLanguage],
      requiresTranslationOrCulturalAidControl: [this.requiresTranslationOrCulturalAid],
      interestedInTranslationOrCulturalAidForOthersControl: [this.interestedInTranslationOrCulturalAidForOthers]
    });
  }

  register() {

  }

  setupLanguageList() {
    this.languageList = [
      'English',
      'Spanish',
      'French'
    ];
  }

  changeKnownLanguage(event) {
    this.knownLanguages = event.value;
  }

}
