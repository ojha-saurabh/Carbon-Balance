import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculateCarbonComponent } from './calculate-carbon/calculate-carbon.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { PagesComponent } from './pages.component';
import { TakeActionComponent } from './take-action/take-action.component';

const routes: Routes = [
  { path: 'caculate-co2', component: CalculateCarbonComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'take-action', component: TakeActionComponent },
  {path: 'create-profile', component: CreateProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
