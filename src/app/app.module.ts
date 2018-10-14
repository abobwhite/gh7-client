import {AppRouters} from './app.routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgModule} from '@angular/core';

import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';

import {AppComponent} from './components/app/app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {HomeComponent} from './components/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from './components/registration/profile/profile.component';
import {AuthInterceptor} from './services/auth.interceptor';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {UserAssistanceService} from './services/userAssistance.service';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    AppRouters,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule
  ],
  providers: [
    AuthService,
    UserService,
    UserAssistanceService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ProfileComponent
  ],
})
export class AppModule {
}
