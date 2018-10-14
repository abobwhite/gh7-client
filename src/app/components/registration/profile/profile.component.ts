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

@Component({
  animations: [routerTransition],
  selector: 'app-all-users',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private unsubscriber: Subject<any> = new Subject();

  allUsersFormGroup: FormGroup;

  givenName: string;
  familyName: string;
  email: string;
  phoneNumber: string;
  preferredLanguage: string;

  knownLocales: any = [];
  localeList: any = [];

  requiresTranslationOrCulturalAid: boolean;
  interestedInTranslationOrCulturalAidForOthers: boolean;

  auth0User: Auth0User;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
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
    this.createUser();
  }

  setupLanguageList() {
    this.localeList = [];
    this.localeList.push(new Locale('English', 'United States'));
    this.localeList.push(new Locale('Spanish', 'Mexico'));
    this.localeList.push(new Locale('Spanish', 'Spain'));
    this.localeList.push(new Locale('French', 'France'));
    this.localeList.push(new Locale('French', 'Canada'));
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
      interestedInTranslationOrCulturalAidForOthersControl: [this.interestedInTranslationOrCulturalAidForOthers]
    });
  }

  changeKnownLanguage(event) {
    this.knownLocales = event.value;
  }

  createUser() {
    const user = new User();
    user.givenName = this.allUsersFormGroup.get('givenNameControl').value;
    user.familyName = this.allUsersFormGroup.get('familyNameControl').value;
    user.email = this.allUsersFormGroup.get('emailControl').value;
    user.phoneNumber = this.allUsersFormGroup.get('phoneNumberControl').value;
    user.knownLanguages = this.allUsersFormGroup.get('knownLanguageControl').value;
    user.preferredLanguage = this.allUsersFormGroup.get('preferredLanguageControl').value;

    this.userService.createUser(user);
  }
}
