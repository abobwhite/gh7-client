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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PostDialogComponent,
    WelcomeComponent,
  ],
  imports: [
    AppRouters,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    RegistrationModule
  ],
  providers: [
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PostDialogComponent
  ],
})
export class AppModule {
}
