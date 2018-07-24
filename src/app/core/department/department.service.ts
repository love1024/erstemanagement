import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators'
import { Department } from '../../shared/models/admin/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private url = environment.urls.departmentsApi;

  private deptObservable = null;

  constructor(private http: HttpClient) { }

  public getDepartmentList(active: Boolean): Observable<Department[]> {
    const url = this.url + "?active=" + active;
    if (this.deptObservable)
      return this.deptObservable;
    else {
      this.deptObservable = this.http.get<Department[]>(url).pipe(shareReplay(1));
      return this.deptObservable;
    }
  }

  public createDepartment(department: Department): Observable<any> {
    this.deptObservable = null;
    return this.http.post<any>(this.url, department);
  }

  public updateDepartment(department: Department): Observable<any> {
    this.deptObservable = null;
    const url = this.url + "/" + department._id;
    return this.http.put<any>(url, department);
  }

  public deleteDepartment(id): Observable<any> {
    this.deptObservable = null;
    const url = this.url + "/" + id;
    return this.http.delete<any>(url);
  }
}
