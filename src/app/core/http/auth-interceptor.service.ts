import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

/**
 * Http Iterceptor to intercept the 
 * Http request and send the token 
 * with it
 * @export
 * @class AuthInterceptorService
 * @implements {HttpInterceptor}
 */
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const idToken = localStorage.getItem('token');

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
