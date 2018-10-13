import {AppRouters} from './app.routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgModule} from '@angular/core';

import {AuthService} from './services/auth.service';
import {DataService} from './services/data.service';

import {AppComponent} from './components/app/app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {PostDialogComponent} from './components/post-dialog/post-dialog.component';
import {RegistrationModule} from './components/registration/registration.module';
import {WelcomeComponent} from './components/welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import {UserService} from './services/user.service';

import {AllUsersComponent} from './components/registration/all-users/all-users.component';
import {RegistrationComponent} from './components/registration/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    AllUsersComponent,
    DashboardComponent,
    PostDialogComponent,
    RegistrationComponent,
    WelcomeComponent
  ],
  imports: [
    AppRouters,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    RegistrationModule
  ],
  providers: [
    AuthService,
    DataService,
    UserService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PostDialogComponent
  ],
})
export class AppModule {
}
