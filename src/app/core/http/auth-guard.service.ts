import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Observable, of } from 'rxjs';

/**
 * AuthGuardService to restrict access to
 * home route to only logged in users
 * @export
 * @class AuthGuardService
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  /**
   * Creates an instance of AuthGuardService.
   * @param {LoginService} loginService 
   * @param {Router} router 
   * @memberof AuthGuardService
   */
  constructor(private loginService: LoginService, private router: Router) { }

  /**
   * Check the user is logged in or not
   * 
   * @param {ActivatedRouteSnapshot} route 
   * @param {RouterStateSnapshot} state 
   * @returns {Observable<boolean>} 
   * @memberof AuthGuardService
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.loginService.isLoggedIn()) {
      return of(true);
    } else {

      //If user is not logged in move to login page
      this.router.navigateByUrl("/login");
      return of(false);
    }
  }
}
