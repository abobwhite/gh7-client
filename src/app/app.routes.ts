import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RegistrationComponent} from './components/registration/registration/registration.component';
import {WelcomeComponent} from './components/welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'register', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouters {}
