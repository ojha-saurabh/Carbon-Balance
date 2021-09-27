import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfterLoginGuard } from 'src/app/global/guard/after-login.guard';
import { CalculateCarbonComponent } from './calculate-carbon/calculate-carbon.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { PagesComponent } from './pages.component';
import { TakeActionComponent } from './take-action/take-action.component';
import { DonateOptionsComponent } from './donate-options/donate-options.component';
import { DonateCartComponent } from './donate-cart/donate-cart.component';
import { DonateFinalComponent } from './donate-final/donate-final.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: 'calculate-co2', component: CalculateCarbonComponent, canActivate: [AfterLoginGuard] },
  { path: 'landing-page', component: LandingPageComponent, canActivate: [AfterLoginGuard] },
  { path: 'take-action', component: TakeActionComponent, canActivate: [AfterLoginGuard] },
  { path: 'create-profile', component: CreateProfileComponent, canActivate: [AfterLoginGuard] },
  { path: 'donate-options', component: DonateOptionsComponent, canActivate: [AfterLoginGuard] },
  { path: 'donate-cart', component: DonateCartComponent, canActivate: [AfterLoginGuard] },
  { path: 'thanks-to-donate', component: DonateFinalComponent, canActivate: [AfterLoginGuard] },
  { path: 'about-us', component: AboutUsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
