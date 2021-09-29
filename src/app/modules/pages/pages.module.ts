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
import { AboutUsComponent } from './about-us/about-us.component';
import { ActionableTipsComponent } from './actionable-tips/actionable-tips.component';
import { TakePledgeComponent } from './take-pledge/take-pledge.component';
import { NewsAndEventsComponent } from './news-and-events/news-and-events.component';


@NgModule({
  declarations: [
    PagesComponent,
    CalculateCarbonComponent,
    LandingPageComponent,
    TakeActionComponent,
    CreateProfileComponent,
    DonateOptionsComponent,
    DonateCartComponent,
    DonateFinalComponent,
    AboutUsComponent,
    ActionableTipsComponent,
    TakePledgeComponent,
    NewsAndEventsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class PagesModule { }
