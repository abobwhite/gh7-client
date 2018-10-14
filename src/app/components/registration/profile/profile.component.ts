import {Component, OnDestroy, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {routerTransition} from '../animations/router.transition';
import {AuthService} from '../../../services/auth.service';
import {Auth0User} from '../../../models/Auth0User';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {Locale} from '../../../models/Locale';
import {ASSISTANCE_CAPABILITY} from '../../../models/ASSISTANCE_CAPABILITY';

@Component({
  animations: [routerTransition],
  selector: 'app-all-users',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private unsubscriber: Subject<any> = new Subject();

  allUsersFormGroup: FormGroup;

  assistanceLanguage: string;
  email: string;
  familyName: string;
  givenName: string;
  phoneNumber: string;
  preferredLanguage: string;

  knownLocales: any = [];
  localeList: any = [];
  assistanceCapabilityKeys = [];
  assistanceCapabilities = [];
  assistanceCapabilitiesAsReadableList = [];

  requiresTranslationOrCulturalAid = false;
  interestedInTranslationOrCulturalAidForOthers = false;


  auth0User: Auth0User;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.assistanceCapabilityKeys = Object.keys(ASSISTANCE_CAPABILITY).filter(String);
  }

  ngOnInit() {
    this.capabilitiesToList();

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
    this.createUser();
  }

  setupLanguageList() {
    this.localeList = [];
    this.localeList.push(new Locale('en_US', 'English (United States)'));
    this.localeList.push(new Locale('es_MX', 'Spanish (Mexico)'));
    this.localeList.push(new Locale('es_ES', 'Spanish (Spain)'));
    this.localeList.push(new Locale('fr_FR', 'French (France)'));
    this.localeList.push(new Locale('fr_CA', 'French (Canada)'));
  }

  setupFormGroup() {
    this.allUsersFormGroup = this.formBuilder.group({
      givenNameControl: [this.auth0User.givenName, Validators.required, this.givenName],
      familyNameControl: [this.auth0User.familyName, Validators.required, this.familyName],
      emailControl: [{value: this.auth0User.email, disabled: true}, Validators.required, this.email],
      phoneNumberControl: [this.phoneNumber, Validators.required],
      knownLanguageControl: [this.knownLocales],
      preferredLanguageControl: [this.preferredLanguage],
      requiresTranslationOrCulturalAidControl: [this.requiresTranslationOrCulturalAid],
      interestedInTranslationOrCulturalAidForOthersControl: [this.interestedInTranslationOrCulturalAidForOthers],
      assistanceLanguageControl: [{value: this.assistanceLanguage, disabled: true}],
      assistanceCapabilitiesControl: [{value: this.assistanceCapabilities, disabled: true}]
    });
  }

  changeKnownLanguage(event) {
    this.knownLocales = event.value;
  }

  changeAid(event) {
    this.requiresTranslationOrCulturalAid = event.checked;
  }

  changeCapabilities(event) {
    this.interestedInTranslationOrCulturalAidForOthers = event.checked;
  }

  changeAssistanceLanguage(event) {
    this.assistanceLanguage = event.value.language;
  }

  changeAssistanceCapabilities(event) {
    this.assistanceCapabilities = event.value;
  }

  createUser() {
    const user = new User();
    user.givenName = this.allUsersFormGroup.get('givenNameControl').value;
    user.familyName = this.allUsersFormGroup.get('familyNameControl').value;
    user.email = this.allUsersFormGroup.get('emailControl').value;
    user.phoneNumber = this.allUsersFormGroup.get('phoneNumberControl').value;
    user.knownLanguages = this.allUsersFormGroup.get('knownLanguageControl').value;
    user.preferredLanguage = this.allUsersFormGroup.get('preferredLanguageControl').value;
    user.assistanceLanguage = this.allUsersFormGroup.get('assistanceLanguageControl').value;

    const capabilities = [];
    for(const cap of this.allUsersFormGroup.get('assistanceCapabilitiesControl').value) {
      capabilities.push(this.reverseCapabilityLookup(cap));
    }
    user.assistanceCapabilities = capabilities;

    this.userService.createUser(user);
  }

  capabilitiesToList() {
    for (const cap of this.assistanceCapabilityKeys) {
      let parsed = cap.replace('_TRANSLATION', '');
      parsed = parsed.replace('_', ' ');
      parsed = parsed.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
      this.assistanceCapabilitiesAsReadableList.push(parsed);
    }
  }

  reverseCapabilityLookup(capability) {
    return capability
      .toUpperCase()
      .replace(' ', '_')
      .concat('_TRANSLATION');
  }
}
