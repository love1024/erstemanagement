import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/shared/models/user/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAccessDto } from 'src/app/shared/models/access/access';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = environment.server;
  }

  getAllUsers(userId): Observable<IUser[]> { 
    return this.http.get<IUser[]>(`${this.url}user/all?userId=${userId}`);
  }

  getUserInfo(userId): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}user/info?userId=${userId}`);
  }

  addUser(user: IUser, userId): Observable<any> {
    return this.http.post<any>(`${this.url}user/add?userId=${userId}`, user);
  }

  updateUser(user: IUser, userId): Observable<any> {
    return this.http.post<any>(`${this.url}user/update?userId=${userId}`, user);
  }

  deleteUser(userId: number, parentUserId): Observable<any> {
    const data = {
      userId: userId
    }
    return this.http.post<any>(`${this.url}user/delete?userId=${parentUserId}`, data);
  }


  getUserAllAccess(userId: number): Observable<IAccessDto> {
    return this.http.get<IAccessDto>(`${this.url}access?userId=${userId}`);
  }

  updateUserAccess(access: IAccessDto): Observable<void> {
    return this.http.post<void>(`${this.url}access`, access);
  }

  changePassword(userId: number, password: string) {
    const data = {userId: userId, password: password};
    return this.http.post<any>(`${this.url}user/password`, data);
  }
}
