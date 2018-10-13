import {Component, OnDestroy, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {routerTransition} from '../animations/router.transition';
import {AuthService} from '../../../services/auth.service';
import {Auth0User} from '../../../models/Auth0User';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  animations: [routerTransition],
  selector: 'app-all-users',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  allUsersFormGroup: FormGroup;

  givenName: string;
  familyName: string;
  email: string;
  phoneNumber: string;
  preferredLanguage: string;

  knownLanguages: any = [];
  requiresTranslationOrCulturalAid: boolean;
  interestedInTranslationOrCulturalAidForOthers: boolean;

  languageList: any = [];

  auth0User: Auth0User;
  private unsubscriber: Subject<any> = new Subject();

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getAuth0User()
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe((auth0User) => {
        this.auth0User = auth0User;
        this.setupFormGroup();
      });

    this.setupLanguageList();
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  register() {
    this.populateUser();

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
      emailControl: [{value: this.auth0User.email, disabled: true}, Validators.required, this.email],
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

  populateUser() {
    this.auth0User.givenName = this.allUsersFormGroup.get('givenNameControl').value;
    this.auth0User.familyName = this.allUsersFormGroup.get('familyNameControl').value;
    this.auth0User.email = this.allUsersFormGroup.get('emailControl').value;
  }
}
