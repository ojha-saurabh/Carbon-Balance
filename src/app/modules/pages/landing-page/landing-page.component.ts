import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  username: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('UserName');
  }

  gotoDonateOptions() {
    this.router.navigateByUrl('/pages/donate-options');
  }

}
