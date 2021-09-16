import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/global/sevices/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

userData: any;
isLoggedIn: any = false;

constructor( private auth: AuthService,
             private route: Router
             ) { }

ngOnInit(): void {
  this.isLoggedIn = localStorage.getItem('isLoggedIn');
  this.auth.userData.subscribe(response => {
    this.userData = response;
  });
}
  
  logOut() {
    localStorage.clear();
    this.route.navigateByUrl('/');
    window.location.reload();
  }

}
