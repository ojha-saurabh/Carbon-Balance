import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/global/sevices/auth.service';
import { CarbonService } from 'src/app/global/sevices/carbon.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-calculate-carbon',
  templateUrl: './calculate-carbon.component.html',
  styleUrls: ['./calculate-carbon.component.css']
})
export class CalculateCarbonComponent implements OnInit {

  @ViewChild('questionaireForm') form: any;

  questionaireData: any;
  userDetails: any;
  isLoggedIn: any;
  totalFootPrint: any = 2.5;

  constructor(private carbon: CarbonService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getQuestionare();
    this.getUserData();
  }

  getQuestionare: any = () => {
    this.carbon.questionaire().subscribe((response: any) =>  {
      if (response){
          this.questionaireData = response.data.questionaire;
          const savedPoints = (response.data.totalCalculatedFootPrint)
          ? response.data.totalCalculatedFootPrint : 2.5;
          this.totalFootPrint = savedPoints;
        }
    });
  }

  getUserData: any = () => {
    this.userDetails = this.auth.getDecodedUserdata();
  }

  onSubmit: any = async (param: any) => {
    if (this.form.valid){
      // Calculate footprint
      let footprintCalc = 2.5;
      for (const data of this.questionaireData){
        // console.log(this.totalFootPrint , (+data.options[data.optionSelected].point));
        footprintCalc = footprintCalc + (+data.options[data.optionSelected].point);
      }
      this.totalFootPrint = footprintCalc.toFixed(2);
      this.carbon.saveCalculatedFootprint({
          questionaireData: this.questionaireData,
          userData: this.userDetails,
          totalCalculatedFootPrint: this.totalFootPrint
        })
      .subscribe((res: any) => {
        Swal.fire('Successful!!', res.message, 'success');
      });
    }
  }

  otherInputFunc: any = ( i: number, event: any) => {
    // this.questionaireData[i].optionSelected = j;
    console.log(i, event.target.value);
    const optionSelected = this.questionaireData[i].optionSelected;
    const input = parseFloat(event.target.value);
    this.questionaireData[i].otherInput = parseFloat(event.target.value);
    let point = 0;
    switch (i) {
      case 0:
        point = (input * 0.5) / 100;
        break;
      case 2:
        point = (input * ( 0.6 - ( input * 0.013)));
        break;
      case 3:
        point = (input * (2.4 - (input * 0.02)));
        break;
      case 6:
        point = (input / 5) * 0.05;
        break;
      case 9:
        point = input * 0.2;
        break;
      case 10:
        point = input * 0.25;
        break;
      case 11:
        point = input * 0.25;
        break;
      case 13:
        point = (input / 1000) * 0.05;
        break;
      case 14:
        point = (input / 1000) * 0.035;
        break;
      case 15:
        point = (input / 1000) * 0.04;
        break;
      case 16:
        point = (input / 200) * 0.04;
        break;
      default:
        point = 0;
    }
    this.questionaireData[i].options[optionSelected].point = point.toFixed(2);
  }

}
