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

    private url = environment.urls.attendanceApi;

    constructor(private http: HttpClient) { }

    public getAttendanceList(): Observable<Attendance[]> {
        return this.http.get<Attendance[]>(this.url);
    }

    public createNewAttendace(attendance: Attendance): Observable<any> {
        return this.http.post<any>(this.url, attendance);
    }

    public deleteAttendance(id): Observable<any> {
        const url = this.url + '/' + id;
        return this.http.delete(url);
    }

    public updateAttendance(attendance: Attendance): Observable<any> {
        const url = this.url + "/" + attendance.attendanceId;
        return this.http.put(url, attendance);
    }
}
