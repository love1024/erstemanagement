import { Attendance } from './../../shared/models/attendance/attendance.model';
import { environment } from './../../../environments/environment';
import { Resource } from './../../shared/models/admin/resource.model';
import { Department } from './../../shared/models/admin/department.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AttdTrackerDataService {

    private url = environment.urls.resourcesApi;

    constructor(private http: HttpClient) { }

    public getAttendanceList(): Observable<Attendance[]> {
        return this.http.get<Attendance[]>(this.url);
    }

    public createNewRecord(obj): Observable<any> {
        return this.http.post<any>(this.url, obj);
    }

    public deleteRecord(id): Observable<any> {
        const url = this.url + '/' + id.toString(10);
        return this.http.delete(this.url);
    }
}
