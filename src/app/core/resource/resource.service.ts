import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from '../../shared/models/admin/resource.model';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private url = environment.urls.resourcesApi;

  private resourceObservable = null;

  constructor(private http: HttpClient) { }

  public getResourceList(active: boolean): Observable<Resource[]> {
    const url = this.url + "?active=" + active;
    if (this.resourceObservable)
      return this.resourceObservable;
    else {
      this.resourceObservable = this.http.get<Resource[]>(url).pipe(shareReplay(1));
      return this.resourceObservable;
    }
  }

  public getResourceById(id: number, active: boolean): Observable<Resource[]> {
    const url = this.url + "/" + id + "?active=" + active;
    return this.http.get<Resource[]>(url);
  }

  public getResourcesByPMId(id: number): Observable<Resource[]> {
    const url = this.url + "/pm/" + id;
    return this.http.get<Resource[]>(url);
  }

  public createResource(resource: Resource): Observable<any> {
    this.resourceObservable = null;
    return this.http.post<any>(this.url, resource);
  }

  public deleteResource(id: number): Observable<any> {
    this.resourceObservable = null;
    const url = this.url + '/' + id;
    return this.http.delete(url);
  }

  public updateResource(resource: Resource): Observable<any> {
    this.resourceObservable = null;
    const url = this.url + '/' + resource._id;
    return this.http.put(url, resource);
  }
}
