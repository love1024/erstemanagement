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

    public createDepartment(obj): Observable<any> {
        return this.http.post<any>(this.url, obj);
    }
}
