import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarbonService {

  questionaireData: any;
  constructor(private http: HttpClient, private router: Router) {
  }

  questionaire: any = (params: {email: string, password: string}) => {
    return this.http.get(environment.apiBaseURL + 'carbon/questionaire');
  }

  saveCalculatedFootprint: any = (params: any) => {
    return this.http.post(environment.apiBaseURL + 'carbon/saveCalculatedFootprint', params);
  }

  getActions: any = (params: {email: string, password: string}) => {
    return this.http.get(environment.apiBaseURL + 'carbon/getActions');
  }

  saveCalculatedActions: any = (params: any) => {
    return this.http.post(environment.apiBaseURL + 'carbon/saveCalculatedActions', params);
  }

  getCarbonSummary: any = (params: any) => {
    return this.http.post(environment.apiBaseURL + 'carbon/fetchSummary', params);
  }
}
