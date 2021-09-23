import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/global/sevices/auth.service';
import { CarbonService } from 'src/app/global/sevices/carbon.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  userData: any;
  isLoggedIn: any = false;
  userName: any;

  totalCarbonFootprint = 2.50;
  actionFootprint = 0;
  remainingFootprint = 2.50;

  constructor(
    private router: Router,
    private carbon: CarbonService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    // this.username = localStorage.getItem('UserName');
    this.userData = this.auth.getDecodedUserdata();
    if (this.userData.displayName){
      this.userName = this.userData.displayName;
    }else{
      const str: any = this.userData.email.split('@')[0];
      this.userName = str;
    }
    this.getCarbonSummary('yearly');
  }

  gotoDonateOptions: any = () => {
    this.router.navigateByUrl('/pages/donate-options');
  }

  getCarbonSummary: any = (param: string) => {

    this.carbon.getCarbonSummary({userData: this.userData, type: param})
    .subscribe((res: any) => {
        if (res){
          if (param === 'yearly'){
            this.totalCarbonFootprint = res.data.totalCarbonFootprint;
            this.actionFootprint = res.data.totalTakeActionPoint;
            this.remainingFootprint = res.data.remainingFootprint.toFixed(2);
          }else{
            this.totalCarbonFootprint = res.data.totalFootprint;
            this.actionFootprint = res.data.actionFootprint;
            this.remainingFootprint = res.data.remaining.toFixed(2);
          }
        }
    });

  }

  onChange: any = (event: any) =>{
    this.getCarbonSummary(event.target.value);
  }

}
