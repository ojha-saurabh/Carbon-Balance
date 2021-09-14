import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../sevices/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AfterLoginGuard implements CanActivate {

  tokenExist: boolean = false;
  constructor( private router: Router, private auth:AuthService){
    let token = localStorage.getItem('authToken');    
    if(token){
      this.tokenExist = true;
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // console.log('token expired',this.auth.isLoggedIn())
      if(this.tokenExist){
        if(this.auth.isLoggedIn()){
          return true;
        }else{
          this.auth.tokenExpired();
          return false;
        }
      }else{
        this.router.navigate(["/auth/login"]);
        return false;
      }      
  }
  
}
