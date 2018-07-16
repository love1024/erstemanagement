import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../../shared/models/attendance/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private url = environment.urls.attendanceApi;

  constructor(private http: HttpClient) { }

  public getAttendanceList(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.url);
  }

  public createAttendance(attendance: Attendance): Observable<any> {
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
