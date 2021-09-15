import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfterLoginGuard } from 'src/app/global/guard/after-login.guard';
import { CalculateCarbonComponent } from './calculate-carbon/calculate-carbon.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { PagesComponent } from './pages.component';
import { TakeActionComponent } from './take-action/take-action.component';

const routes: Routes = [
  { path: 'caculate-co2', component: CalculateCarbonComponent, canActivate: [AfterLoginGuard] },
  { path: 'landing-page', component: LandingPageComponent, canActivate: [AfterLoginGuard] },
  { path: 'take-action', component: TakeActionComponent, canActivate: [AfterLoginGuard] },
  { path: 'create-profile', component: CreateProfileComponent, canActivate: [AfterLoginGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
