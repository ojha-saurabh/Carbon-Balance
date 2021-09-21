import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../sevices/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService){

  }
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');
    const authRequest =  httpRequest.clone({ headers: httpRequest.headers.set('Authorization', 'Bearer ' + authToken) });

    return next.handle(authRequest).pipe(tap(
        event => this.handleSuccessEvent(event),
        event => this.handleErrorEvent(event)
    ));
  }

  handleSuccessEvent = (event: any) => {
      if (event instanceof HttpResponse){

      }
  }

  handleErrorEvent = (event: any) => {
        if (event instanceof HttpErrorResponse){
            console.log(event);
            if (event.status === 401){
                this.auth.logout();
            }
        }
    }
}