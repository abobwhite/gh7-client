import {Component, OnDestroy, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {routerTransition} from '../animations/router.transition';
import {AuthService} from '../../../services/auth.service';
import {Auth0User} from '../../../models/Auth0User';
import {forkJoin, Observable, of, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {Locale} from '../../../models/Locale';
import {ASSISTANCE_CAPABILITY} from '../../../models/ASSISTANCE_CAPABILITY';
import {Router} from '@angular/router';
import {find} from 'lodash';

@Component({
  animations: [routerTransition],
  selector: 'app-all-users',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private unsubscriber: Subject<any> = new Subject();

  allUsersFormGroup: FormGroup;

  assistanceLanguage: Locale;
  email: string;
  familyName: string;
  givenName: string;
  phoneNumber: string;
  preferredLanguage: Locale;

  knownLocales: Locale[] = [];
  localeList: Locale[] = [];
  assistanceCapabilityKeys = [];
  assistanceCapabilities = [];
  assistanceCapabilitiesAsReadableList = [];

  requiresTranslationOrCulturalAid = false;
  interestedInTranslationOrCulturalAidForOthers = false;

  auth0User: Auth0User;
  user: User;
  editing = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.assistanceCapabilityKeys = Object.keys(ASSISTANCE_CAPABILITY).filter(String);
  }

  ngOnInit() {
    this.capabilitiesToList();

    forkJoin(this.authService.getAuth0User(), this.authService.getAuthenticatedUser())
      .pipe(
        takeUntil(this.unsubscriber)
      )
      .subscribe(([auth0User, user]) => {
        this.auth0User = auth0User;
        if (user) {
          this.user = user;
          this.editing = true;
        } else {
          const newUser = new User();
          newUser.id = auth0User.sub;
          this.user = newUser;
        }
        this.setupFormGroup();
      });

    this.setupLanguageList();
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  saveUser() {
    this.mapFieldsToUser();

    let save$: Observable<User> = of(null);
    if (this.editing) {
      // save$ = this.userService.updateUser(this.user.id, {});
    } else {
      save$ = this.userService.createUser(this.user);
    }

    save$.subscribe(res => {
      this.authService.clearAuthenticatedUserCache();
      this.router.navigate(['/dashboard']);
    });
  }

  setupLanguageList() {
    this.localeList = [];
    this.localeList.push(new Locale('en', 'US', 'English (United States)'));
    this.localeList.push(new Locale('es', 'MX', 'Spanish (Mexico)'));
    this.localeList.push(new Locale('es', 'ES', 'Spanish (Spain)'));
    this.localeList.push(new Locale('fr', 'FR', 'French (France)'));
    this.localeList.push(new Locale('fr', 'CA', 'French (Canada)'));
  }

  setupFormGroup() {
    this.allUsersFormGroup = this.formBuilder.group({
      givenNameControl: [this.auth0User.givenName || this.user.givenName, Validators.required, this.givenName],
      familyNameControl: [this.auth0User.familyName || this.user.familyName, Validators.required, this.familyName],
      emailControl: [{value: this.auth0User.email || this.user.email, disabled: true}, Validators.required, this.email],
      phoneNumberControl: [this.user.phoneNumber, Validators.required],
      knownLanguageControl: [this.user.knownLanguages],
      preferredLanguageControl: [this.user.preferredLanguage],
      requiresTranslationOrCulturalAidControl: [this.user.needsAssistance],
      interestedInTranslationOrCulturalAidForOthersControl: [this.user.canAssist],
      assistanceLanguageControl: [{value: this.user.assistanceLanguage, disabled: !this.user.canAssist}],
      assistanceCapabilitiesControl: [{value: this.user.assistanceCapabilities, disabled: !this.user.canAssist}]
    });

    // this.allUsersFormGroup.setControl('preferredLanguageControl',
    //   find(this.localeList, {localeCode: this.user.preferredLanguage.localeCode}));
    // this.knownLocales = this.localeList.filter((locale) => {
    //   return !!find(this.user.knownLanguages, {localeCode: locale.localeCode});
    // });
    // this.requiresTranslationOrCulturalAid = this.user.needsAssistance;
    // this.assistanceLanguage = find(this.localeList, {localeCode: this.user.assistanceLanguage.localeCode});
    // this.interestedInTranslationOrCulturalAidForOthers = this.user.canAssist;
    // this.assistanceCapabilities = this.user.assistanceCapabilities;
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

  mapFieldsToUser() {
    this.user.givenName = this.allUsersFormGroup.get('givenNameControl').value;
    this.user.familyName = this.allUsersFormGroup.get('familyNameControl').value;
    this.user.email = this.allUsersFormGroup.get('emailControl').value;
    this.user.phoneNumber = this.allUsersFormGroup.get('phoneNumberControl').value;
    this.user.knownLanguages = this.allUsersFormGroup.get('knownLanguageControl').value;
    this.user.preferredLanguage = this.allUsersFormGroup.get('preferredLanguageControl').value;
    this.user.assistanceLanguage = this.allUsersFormGroup.get('assistanceLanguageControl').value;

    const capabilities = [];
    for (const cap of this.allUsersFormGroup.get('assistanceCapabilitiesControl').value) {
      capabilities.push(this.reverseCapabilityLookup(cap));
    }
    this.user.assistanceCapabilities = capabilities;
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
