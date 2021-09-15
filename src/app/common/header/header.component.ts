import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: any = false;

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
  }

  logOut() {
    localStorage.clear();
    this.route.navigateByUrl('/');
    window.location.reload();
  }

}
