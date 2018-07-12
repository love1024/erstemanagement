import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Technology } from '../../shared/models/admin/technology.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminTechDataService {

  private url = environment.urls.technologyApi;

  constructor(private http: HttpClient) { }

  getTechnologyList(): Observable<Technology[]> {
    return this.http.get<Technology[]>(this.url);
  }

  public createDepartment(technology: Technology): Observable<any> {
    return this.http.post<any>(this.url, technology);
  }

  public updateDepartment(technology: Technology): Observable<any> {
    const url = this.url + '/' + technology.technologyId;
    return this.http.put<any>(url, technology);
  }

  public deleteDepartment(id): Observable<any> {
    const url = this.url + '/' + id;
    return this.http.delete<any>(url);
  }
}
