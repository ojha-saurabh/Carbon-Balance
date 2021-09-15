import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../sevices/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AfterLoginGuard implements CanActivate {

  tokenExist = false;
  constructor( private router: Router, private auth: AuthService){

    const token = localStorage.getItem('authToken');
    if (token) {
      this.tokenExist = true;
    }
    this.auth.getUserData();

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if ( this.tokenExist ) {
        if (this.auth.isLoggedIn()) {
          return true;
        }else{
          this.auth.tokenExpired();
          return false;
        }
      }else{
        this.router.navigate(['/auth/login']);
        return false;
      }
    }
}
