import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/global/sevices/auth.service';
import { CarbonService } from 'src/app/global/sevices/carbon.service';

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
      console.log(response);
      this.questionaireData = response.data.questionaire;
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
      this.carbon.saveCalculatedFootprint(
        {
          questionaireData: this.questionaireData,
          userData: this.userDetails,
          totalCalculatedFootPrint: this.totalFootPrint
        })
      .subscribe((res: any) => {
        console.log(res);
      });
    }
  }

  onSelect = ( i: number, j: number) => {
    this.questionaireData[i].optionSelected = j;
  }

}
