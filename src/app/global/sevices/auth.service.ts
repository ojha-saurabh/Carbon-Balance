import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from "moment";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper : any;
  
  constructor(private http : HttpClient, private router: Router) { 
    this.jwtHelper = new JwtHelperService();
  }

  login(params:{email:string, password:string}){
    return this.http.post('http://localhost:8081/api/v1/auth/login',params);
  }

  handleToken(params:{status:boolean, message:string, token:string}){
    let decoded:any = this.jwtHelper.decodeToken(params.token); 
    if(decoded){
      localStorage.setItem('authToken', params.token);      
      this.router.navigate(['/pages/create-profile']);
      Swal.fire('Hurray!!!', params.message, 'success');
    }else{
      Swal.fire('Oops...', 'Something went wrong!', 'error');
    }
  }

  logout() {
      localStorage.removeItem("authToken");
      Swal.fire('Successful!!!', 'You have been logged out successfully.', 'success');
      this.router.navigate(["/"]);
  }

  tokenExpired(){
    localStorage.removeItem("authToken");
    Swal.fire('Oops!!!', 'Your login authorization token has been expired. Please login again.', 'warning');
    this.router.navigate(["/auth/login"]);
  }

  isLoggedIn() {
    let token:any = localStorage.getItem("authToken");
    return !this.jwtHelper.isTokenExpired(token);
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }    
}
