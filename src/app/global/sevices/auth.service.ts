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

  getUserByEmail: any = (params: {email: string}) => {
    return this.http.post(environment.apiBaseURL + 'auth/getUserById', params);
  }

  createProfile: any = (params: any) => {
    console.log('================params', params);
    const formData = new FormData();
    formData.append('displayName', params.displayName);
    formData.append('about', params.about);
    formData.append('firstName', params.firstName);
    formData.append('lastName', params.lastName);
    formData.append('email', params.email);
    formData.append('streetAddress', params.streetAddress);
    formData.append('zipCode', params.zipCode);
    formData.append('state', params.state);
    formData.append('age', params.age);
    formData.append('occupation', params.occupation);
    formData.append('termsAccepted', params.termsAccepted);
    return this.http.post(environment.apiBaseURL + 'auth/createProfile', params);
  }

  handleToken: any = (params: {status: boolean, message: string, token: string}) => {
    const decoded: any = this.jwtHelper.decodeToken(params.token);
    if (decoded){
      localStorage.setItem('authToken', params.token);
      localStorage.setItem('isLoggedIn', 'True');
      this.userData.next(decoded);
      this.router.navigate(['/pages/create-profile']);
      Swal.fire('Hurray!!!', params.message, 'success');
      this.getUserData();
    }else{
      Swal.fire('Oops...', 'Something went wrong!', 'error');
    }
  }

  logout: any = (params: any = '') =>  {
    localStorage.clear();
    if (params === 'tokenError'){
      Swal.fire('Token error!!!', 'Auth token might be expired. Please login again.', 'success');
      this.router.navigate(['/auth/login']);
    }else{
      Swal.fire('Successful!!!', 'You have been logged out successfully.', 'success');
      this.router.navigate(['/auth/login']);
    }
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
    decoded.displayName = (localStorage.getItem('displayName'))?localStorage.getItem('displayName'):(decoded.displayName)?decoded.displayName:'';
    this.userData.next(decoded);
  }

  getDecodedUserdata: any = () =>{
    let decoded: any = '';
    const token: any = localStorage.getItem('authToken');
    if (!this.jwtHelper.isTokenExpired(token)){
      decoded = this.jwtHelper.decodeToken(token);
    }else{
      decoded = '';
    }
    decoded.displayName = (localStorage.getItem('displayName'))?localStorage.getItem('displayName'):(decoded.displayName)?decoded.displayName:'';
    return decoded;
  }

}
