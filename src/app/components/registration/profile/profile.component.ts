import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {routerTransition} from '../animations/router.transition';
import {AuthService} from '../../../services/auth.service';
import {Auth0User} from '../../../models/Auth0User';

@Component({
  animations: [routerTransition],
  selector: 'app-all-users',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  allUsersFormGroup: FormGroup;

  givenName: string;
  familyName: string;
  email: string;
  phoneNumber: number;
  preferredLanguage: string;

  knownLanguages: any = [];
  requiresTranslationOrCulturalAid: boolean;
  interestedInTranslationOrCulturalAidForOthers: boolean;

  languageList: any = [];

  auth0User: Auth0User;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit() {

    this.auth0User = this.authService.auth0User;

    this.setupLanguageList();
    this.setupFormGroup();


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

  setupFormGroup() {
    this.allUsersFormGroup = this.formBuilder.group({
      givenNameControl: [this.auth0User.givenName, Validators.required, this.givenName],
      familyNameControl: [this.auth0User.familyName, Validators.required, this.familyName],
      emailControl: [this.auth0User.email, Validators.required, this.email],
      phoneNumberControl: [this.phoneNumber, Validators.required],
      knownLanguageControl: [this.knownLanguages],
      preferredLanguageControl: [this.preferredLanguage],
      requiresTranslationOrCulturalAidControl: [this.requiresTranslationOrCulturalAid],
      interestedInTranslationOrCulturalAidForOthersControl: [this.interestedInTranslationOrCulturalAidForOthers]
    });
  }

  changeKnownLanguage(event) {
    this.knownLanguages = event.value;
  }
}
