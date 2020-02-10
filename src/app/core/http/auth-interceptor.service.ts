import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const idToken = localStorage.getItem('token');

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken)
      });

      return next.handle(cloned)
        .pipe(
          catchError(err => {
            this.router.navigateByUrl('/unauthorized');
            return throwError(err);
          })
        );
    } else {
      return next.handle(req);
    }
  }
}
