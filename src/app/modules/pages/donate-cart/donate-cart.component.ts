import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donate-cart',
  templateUrl: './donate-cart.component.html',
  styleUrls: ['./donate-cart.component.css']
})
export class DonateCartComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
   }

  ngOnInit(): void {
  }

  gotoDonateThanks: any = () => {
    this.router.navigateByUrl('/pages/thanks-to-donate');
  }

}
