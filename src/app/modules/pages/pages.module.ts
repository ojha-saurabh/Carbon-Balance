import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CalculateCarbonComponent } from './calculate-carbon/calculate-carbon.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TakeActionComponent } from './take-action/take-action.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonateOptionsComponent } from './donate-options/donate-options.component';
import { DonateCartComponent } from './donate-cart/donate-cart.component';
import { DonateFinalComponent } from './donate-final/donate-final.component';


@NgModule({
  declarations: [
    PagesComponent,
    CalculateCarbonComponent,
    LandingPageComponent,
    TakeActionComponent,
    CreateProfileComponent,
    DonateOptionsComponent,
    DonateCartComponent,
    DonateFinalComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class PagesModule { }
