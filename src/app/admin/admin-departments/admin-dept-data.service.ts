import { map } from 'rxjs/operators';
import { Department } from './../../shared/models/admin/department.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminDeptDataService {

    private url = environment.urls.departmentsApi;

    constructor(private http: HttpClient) { }

    public getDepartmentList(): Observable<Department[]> {
        return this.http.get<Department[]>(this.url);
    }

    public createDepartment(department: Department): Observable<any> {
        return this.http.post<any>(this.url, department);
    }

    public updateDepartment(department: Department): Observable<any> {
        const url = this.url + "/" + department.departmentId;
        return this.http.put<any>(url, department);
    }

    public deleteDepartment(id): Observable<any> {
        const url = this.url + "/" + id;
        return this.http.delete<any>(url);
    }
}
