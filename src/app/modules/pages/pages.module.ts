import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CalculateCarbonComponent } from './calculate-carbon/calculate-carbon.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


@NgModule({
  declarations: [PagesComponent, CalculateCarbonComponent, LandingPageComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
