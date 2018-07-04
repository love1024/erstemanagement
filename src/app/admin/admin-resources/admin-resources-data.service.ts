import { environment } from './../../../environments/environment';
import { Resource } from './../../shared/models/admin/resource.model';
import { Department } from './../../shared/models/admin/department.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminResourcesDataService {

    private url = environment.urls.resourcesApi;

    constructor(private http: HttpClient) { }

    public getResourceList(active: boolean): Observable<Resource[]> {
        const url = this.url + "?active=" + active;
        console.log(url);
        return this.http.get<Resource[]>(url);
    }

    public createResource(resource: Resource): Observable<any> {
        return this.http.post<any>(this.url, resource);
    }

    public deleteResource(id: number): Observable<any> {
        const url = this.url + '/' + id;
        console.log(url);
        return this.http.delete(url);
    }

    public updateResource(resource: Resource): Observable<any> {
        const url = this.url + '/' + resource.resourceId.toString();
        console.log(url);
        return this.http.put(url, resource);
    }
}

