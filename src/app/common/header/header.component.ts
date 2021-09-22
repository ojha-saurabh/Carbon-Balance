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

// ngOnInit(): void {
//   this.isLoggedIn = localStorage.getItem('isLoggedIn');
//   this.userName = localStorage.getItem('UserName');
//   this.auth.userData.subscribe(response => {
//     this.isLoggedIn = this.auth.isLoggedIn();
//     if (this.isLoggedIn){
//       if (response.name){
//         this.userName = response.name;
//       }else{
//         const str: any = response.email.split('@')[0];
//         this.userName = str;
//       }
//     }
//     this.userData = response;
//   });
//   this.auth.getUserByEmail({email: "ramyapenjerla@gmail.com"}).subscribe((res: any) => {
//     console.log('================get by email response', res);
//     if(res.status) {
//       this.userName = res;
//     } else {
//       this.toastr.error('Something Went Wrong!', 'Oops!');
//     }
//   })
// }

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
    this.auth.logout();
  }

}
