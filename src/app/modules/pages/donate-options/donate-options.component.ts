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
  ) { }

  ngOnInit(): void {
  }

  gotoDonateCart: any = () => {
    this.router.navigateByUrl('/pages/donate-cart');
  }

}
