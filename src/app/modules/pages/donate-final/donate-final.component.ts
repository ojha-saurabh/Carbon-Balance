import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donate-final',
  templateUrl: './donate-final.component.html',
  styleUrls: ['./donate-final.component.css']
})
export class DonateFinalComponent implements OnInit {

  constructor() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
   }

  ngOnInit(): void {
  }

}
