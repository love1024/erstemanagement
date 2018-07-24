import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { Technology } from '../../shared/models/admin/technology.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminTechDataService {

  private url = environment.urls.technologyApi;

  private techObservable = null;

  constructor(private http: HttpClient) { }

  getTechnologyList(): Observable<Technology[]> {
    if (this.techObservable)
      return this.techObservable;
    else {
      this.techObservable = this.http.get<Technology[]>(this.url).pipe(shareReplay(1));
      return this.techObservable;
    }
  }

  public createDepartment(technology: Technology): Observable<any> {
    this.techObservable = null;
    return this.http.post<any>(this.url, technology);
  }

  public updateDepartment(technology: Technology): Observable<any> {
    this.techObservable = null;
    const url = this.url + '/' + technology.technologyId;
    return this.http.put<any>(url, technology);
  }

  public deleteDepartment(id): Observable<any> {
    this.techObservable = null;
    const url = this.url + '/' + id;
    return this.http.delete<any>(url);
  }
}
