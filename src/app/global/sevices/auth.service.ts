import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: any;

  userData = new Subject<any>();
  constructor(private http: HttpClient, private router: Router) {
    this.jwtHelper = new JwtHelperService();
  }

  login: any = (params: {email: string, password: string}) => {
    return this.http.post(environment.apiBaseURL + 'auth/login', params);
  }

  register: any = (params: {email: string, password: string}) => {
    return this.http.post(environment.apiBaseURL + 'auth/register', params);
  }

  handleToken: any = (params: {status: boolean, message: string, token: string}) => {
    const decoded: any = this.jwtHelper.decodeToken(params.token);
    if (decoded){
      localStorage.setItem('authToken', params.token);
      localStorage.setItem('isLoggedIn', 'True');
      this.router.navigate(['/pages/create-profile']);
      this.userData.next(decoded);
      Swal.fire('Hurray!!!', params.message, 'success');
    }else{
      Swal.fire('Oops...', 'Something went wrong!', 'error');
    }
  }

  logout: any = () =>  {
      localStorage.removeItem('authToken');
      Swal.fire('Successful!!!', 'You have been logged out successfully.', 'success');
      this.router.navigate(['/']);
  }

  tokenExpired: any = () => {
    localStorage.removeItem('authToken');
    Swal.fire('Oops!!!', 'Your login authorization token has been expired. Please login again.', 'warning');
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn: any = () => {
    const token: any = localStorage.getItem('authToken');
    return !this.jwtHelper.isTokenExpired(token);
  }

  isLoggedOut: any = () => {
      return !this.isLoggedIn();
  }

  getUserData: any = () => {
    let decoded: any = '';
    const token: any = localStorage.getItem('authToken');
    if (!this.jwtHelper.isTokenExpired(token)){
      decoded = this.jwtHelper.decodeToken(token);
    }else{
      decoded = '';
    }
    this.userData.next(decoded);
  }

}
