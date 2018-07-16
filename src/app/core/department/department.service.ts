import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../../shared/models/admin/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private url = environment.urls.departmentsApi;

  constructor(private http: HttpClient) { }

  public getDepartmentList(active: Boolean): Observable<Department[]> {
    const url = this.url + "?active=" + active;
    return this.http.get<Department[]>(url);
  }

  public createDepartment(department: Department): Observable<any> {
    return this.http.post<any>(this.url, department);
  }

  public updateDepartment(department: Department): Observable<any> {
    const url = this.url + "/" + department._id;
    return this.http.put<any>(url, department);
  }

  public deleteDepartment(id): Observable<any> {
    const url = this.url + "/" + id;
    return this.http.delete<any>(url);
  }
}
