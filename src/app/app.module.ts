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
    RouterModule
  ],
  providers: [
    AuthService,
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ProfileComponent
  ],
})
export class AppModule {
}
