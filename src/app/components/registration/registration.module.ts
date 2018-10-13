import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AllUsersComponent} from './all-users/all-users.component';
import {RegistrationComponent} from './registration/registration.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    AllUsersComponent,
    RegistrationComponent
  ]
})
export class RegistrationModule {
}
