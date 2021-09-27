import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/global/sevices/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

userData: any;
isLoggedIn: any = false;
userName: any;

constructor( 
  private auth: AuthService,
  private route: Router,
  private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  this.auth.userData.subscribe(response => {
    this.isLoggedIn = this.auth.isLoggedIn();
    if (this.isLoggedIn){
      if (response.displayName){
        this.userName = response.displayName;
      }else{
        const str: any = response.email.split('@')[0];
        this.userName = str;
      }
    }
    this.userData = response;
  });

  this.isLoggedIn = this.auth.isLoggedIn();
  if (this.isLoggedIn){
    this.userData = this.auth.getDecodedUserdata();
    if (this.userData.displayName){
      this.userName = this.userData.displayName;
    }else{
      const str: any = this.userData.email.split('@')[0];
      this.userName = str;
    }
  }
  console.log(this.userData)
}

logOut: any = () => {
  this.auth.logout();
}

}
