import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/global/sevices/auth.service';
import { CarbonService } from 'src/app/global/sevices/carbon.service';

import { environment } from 'src/environments/environment';
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
  
  imageBaseUrl: any; 
  bannerImage: any;
  profileImage: any;

  totalCarbonFootprint = 2.50;
  actionFootprint = 0;
  remainingFootprint = 2.50;

  constructor(
    private router: Router,
    private carbon: CarbonService,
    private auth: AuthService
  ) { 
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  ngOnInit(): void {
    this.userData = this.auth.getDecodedUserdata();    
    this.getUser();
    if (this.userData.displayName){
      this.userName = this.userData.displayName;
    }else{
      const str: any = this.userData.email.split('@')[0];
      this.userName = str;
    }
    this.getCarbonSummary('yearly');
    this.imageBaseUrl = environment.imageBaseUrl;
    this.profileImage = environment.imageBaseUrl+'noImage.png';
    this.bannerImage = environment.imageBaseUrl+'noImage.png';
  }

  getUser: any = () => {
    const data = {
      email: this.userData.email,
      id: this.userData.id
    };

    this.auth.getUserByEmail(data).subscribe((res: any) => {
      if (res.status) {             
        if(res.data.profileImage && res.data.profileImage!=''){
          this.profileImage = environment.imageBaseUrl+res.data.profileImage;
        }
        if(res.data.bannerImage && res.data.bannerImage!=''){
          this.bannerImage = environment.imageBaseUrl+res.data.bannerImage;
        }
      }
    });
  }

  gotoDonateOptions: any = () => {
    this.router.navigateByUrl('/pages/donate-options');
  }

  getCarbonSummary: any = (param: string) => {

    this.carbon.getCarbonSummary({userData: this.userData, type: param})
    .subscribe((res: any) => {
        if (res){
          if (param === 'yearly'){
            this.totalCarbonFootprint = res.data.totalCarbonFootprint.toFixed(2);
            this.actionFootprint = res.data.totalTakeActionPoint.toFixed(2);
            this.remainingFootprint = res.data.remainingFootprint.toFixed(2);
          }else{
            this.totalCarbonFootprint = res.data.totalFootprint.toFixed(2);
            this.actionFootprint = res.data.actionFootprint.toFixed(2);
            this.remainingFootprint = res.data.remaining.toFixed(2);
          }
        }
    });

  }

  onChange: any = (event: any) =>{
    this.getCarbonSummary(event.target.value);
  }

}
