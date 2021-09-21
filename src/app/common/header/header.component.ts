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
userName: any;

constructor( private auth: AuthService, private route: Router) { }

ngOnInit(): void {
  this.auth.userData.subscribe(response => {
    this.isLoggedIn = this.auth.isLoggedIn();
    if (this.isLoggedIn){
      if (response.name){
        this.userName = response.name;
      }else{
        const str: any = response.email.split('@')[0];
        this.userName = str;
      }
    }
    this.userData = response;
  });
}

logOut: any = () => {
    localStorage.clear();
    this.route.navigateByUrl('/');
    window.location.reload();
  }

}
