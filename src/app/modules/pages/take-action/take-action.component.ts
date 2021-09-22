import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/global/sevices/auth.service';
import { CarbonService } from 'src/app/global/sevices/carbon.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-take-action',
  templateUrl: './take-action.component.html',
  styleUrls: ['./take-action.component.css']
})
export class TakeActionComponent implements OnInit {

  actionData: any;
  totalActions: any;
  userDetails: any;
  actionDataArray: any = [1, 1];
  saveObjArray: any = [];

  @ViewChild('actionForm') form: any;
  constructor(private carbon: CarbonService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getActions();
    this.getUserData();
  }

  getActions: any = () => {
    this.carbon.getActions().subscribe((response: any) =>  {
      if (response){
          console.log(response);
          this.actionData = response.data.actions;
          console.log(response.data)
          if (response.objArray){
            this.saveObjArray = response.objArray.actions;
          }else{
            for (const data of this.actionDataArray.keys()){
              this.saveObjArray.push(this.actionData[data]);
            }
          }
        }
    });
  }

  getUserData: any = () => {
    this.userDetails = this.auth.getDecodedUserdata();
  }

  changeAction: any = (i: any, event: any) => {
    // console.log(i, event.target.value);
    // console.log(this.actionData[event.target.value]);
    this.saveObjArray.splice(i, 1, this.actionData[event.target.value]);
    // console.log(this.saveObjArray);
  }

  changeOption: any = (i: any, event: any) => {
    // console.log(i, event.target.value);
    this.saveObjArray[i].selectedOption = event.target.value;
  }

  otherInputFunc: any = (i: any, event: any) => {
    // console.log(i, event.target.value);
    this.saveObjArray[i].otherInput = event.target.value;
  }

  addAction: any = () => {
    const length = this.saveObjArray.length;
    this.saveObjArray.push(this.actionData[length]);
  }

  onSubmit: any = async (param: any) => {
    let takeActionCalc = 0;
    for (const data of this.saveObjArray){
      console.log(data);
      if (data.options[data.selectedOption].optionText === 'Other'){
        takeActionCalc = takeActionCalc + (+data.otherInput * data.weight);
      }else{
        takeActionCalc = takeActionCalc + (+data.options[data.selectedOption].optionValue * data.weight);
      }
    }
    this.carbon.saveCalculatedActions({
      actionData: this.saveObjArray,
      userData: this.userDetails,
      takeActionPoint: takeActionCalc
    })
  .subscribe((res: any) => {
    Swal.fire('Successful!!', res.message, 'success');
  });
    console.log(this.saveObjArray);
  }
}
