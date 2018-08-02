import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Login } from '../../shared/models/login/login.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import * as moment from 'moment';
import { tap, shareReplay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /** Login url on AWS */
  private url = environment.urls.attendanceApi;

  /**
   * Creates an instance of LoginService.
   * @param {HttpClient} httpClient 
   * @memberof LoginService
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Send the login request to server for token
   * 
   * @param {Login} cred 
   * @returns {Observable<String>} 
   * @memberof LoginService
   */
  public login(cred: Login): Observable<String> {
    return this.httpClient.post<String>(this.url, cred)
      .pipe(
        tap(this.setSession),
        shareReplay(),
        catchError(this.handleError)
      )
  }

  /**
   * Logout from the application
   * 
   * @memberof LoginService
   */
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  /**
   * Set the token to localstorage
   * 
   * @param {any} loginResult 
   * @memberof LoginService
   */
  public setSession(loginResult) {
    if (loginResult.token) {
      const expiresAt = moment().add(loginResult.expiresIn, 'second');
      localStorage.setItem('token', loginResult.token);
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }
  }

  /**
   * Check if user is logged in
   * 
   * @returns 
   * @memberof LoginService
   */
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  /**
   * Check if user is logged out
   * 
   * @returns 
   * @memberof LoginService
   */
  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  /**
   * Get expiration time of token
   * 
   * @returns 
   * @memberof LoginService
   */
  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  /**
   * Log any server error
   * 
   * @param {HttpErrorResponse} err 
   * @returns {Observable<any>} 
   * @memberof LoginService
   */
  handleError(err: HttpErrorResponse): Observable<any> {
    console.log(err);
    throw throwError(err);
  }
}
