import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculateCarbonComponent } from './calculate-carbon/calculate-carbon.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { PagesComponent } from './pages.component';
import { TakeActionComponent } from './take-action/take-action.component';

<<<<<<< HEAD
const routes: Routes = [
  { path: 'caculate-co2', component: CalculateCarbonComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'take-action', component: TakeActionComponent }
];
=======
const routes: Routes = [{ path: 'caculate-co2', component: CalculateCarbonComponent }, { path: 'landing-page', component: LandingPageComponent }, {path: 'create-profile', component: CreateProfileComponent}];
>>>>>>> saurabh

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
