import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-take-pledge',
  templateUrl: './take-pledge.component.html',
  styleUrls: ['./take-pledge.component.css']
})
export class TakePledgeComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  ngOnInit(): void {
  }

  goBack: any = () => {
    this.router.navigateByUrl("/");
  }

}
