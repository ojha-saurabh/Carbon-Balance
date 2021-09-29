import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donate-options',
  templateUrl: './donate-options.component.html',
  styleUrls: ['./donate-options.component.css']
})
export class DonateOptionsComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
   }

  ngOnInit(): void {
  }

  gotoDonateCart: any = () => {
    this.router.navigateByUrl('/pages/donate-cart');
  }

}
