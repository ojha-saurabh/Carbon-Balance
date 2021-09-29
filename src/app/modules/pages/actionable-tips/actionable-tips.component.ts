import { Component, OnInit } from '@angular/core';
import { CarbonService } from 'src/app/global/sevices/carbon.service';

@Component({
  selector: 'app-actionable-tips',
  templateUrl: './actionable-tips.component.html',
  styleUrls: ['./actionable-tips.component.css']
})
export class ActionableTipsComponent implements OnInit {

  x: any;
  data: any = [
    {title: "title 1", description: "des1"},
    {title: "title 2", description: "des2"},
    {title: "title 3", description: "des3"},
  ]
  constructor(
    private carbonService: CarbonService
  ) { }

  ngOnInit(): void {
    this.carbonService.getActionableTips().subscribe((res: any) => {
      this.data = res;
      console.log('=============res', res);
    })
  }

  myFunction(id: any) {
    console.log('================id', id)
    this.x = document.getElementById(id);
    if (this.x.className.indexOf("w3-show") == -1) {
      this.x.className += " w3-show";
    } else { 
      this.x.className = this.x.className.replace(" w3-show", "");
    }
  }

}
