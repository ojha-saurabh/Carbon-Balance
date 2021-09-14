import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-take-action',
  templateUrl: './take-action.component.html',
  styleUrls: ['./take-action.component.css']
})
export class TakeActionComponent implements OnInit {

  questions:any = [
    {title: "Installed Solar Water heater", options: ["1 Count", "2 Count"]}, 
    {title: "Used cycle for errand this month", options: ["11 Times", "12 Times"]},
    {title: "Volunteered in a tree plantation drive this month", options: ["8 Trees", "9 Trees"]},
  ];
  

  chgvalue1: any;
  chgvalue2: any;
  chgvalue3: any;
  selectedValue: any = "Used cycle for errand this month";

  constructor() { }

  ngOnInit(): void {
  }

  onChange1(change: any) {
    console.log('=============change', change.value)
    this.chgvalue1 = change.value;
  }

  onChange2(change: any) {
    this.selectedValue = "Used cycle for errand this month";
    console.log('=============change', change.value)
    this.chgvalue2 = change.value;
    
  }

  onChange3(change: any) {
    console.log('=============change', change.value)
    this.chgvalue3 = change.value;
  }

}
