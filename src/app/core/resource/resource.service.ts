import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from '../../shared/models/admin/resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private url = environment.urls.resourcesApi;

  constructor(private http: HttpClient) { }

  public getResourceList(active: boolean): Observable<Resource[]> {
    const url = this.url + "?active=" + active;
    return this.http.get<Resource[]>(url);
  }

  public createResource(resource: Resource): Observable<any> {
    return this.http.post<any>(this.url, resource);
  }

  public deleteResource(id: number): Observable<any> {
    const url = this.url + '/' + id;
    return this.http.delete(url);
  }

  public updateResource(resource: Resource): Observable<any> {
    const url = this.url + '/' + resource._id;
    return this.http.put(url, resource);
  }
}
