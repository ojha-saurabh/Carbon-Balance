import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CalculateCarbonComponent } from './calculate-carbon/calculate-carbon.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
<<<<<<< HEAD
import { TakeActionComponent } from './take-action/take-action.component';


@NgModule({
  declarations: [
    PagesComponent,
    CalculateCarbonComponent,
    LandingPageComponent,
    TakeActionComponent
  ],
=======
import { CreateProfileComponent } from './create-profile/create-profile.component';


@NgModule({
  declarations: [PagesComponent, CalculateCarbonComponent, LandingPageComponent, CreateProfileComponent],
>>>>>>> saurabh
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
