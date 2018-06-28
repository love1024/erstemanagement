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

    public getResourceList(): Observable<Resource[]> {
        return this.http.get<Resource[]>(this.url);
    }

    public createResource(obj): Observable<any> {
        return this.http.post<any>(this.url, obj);
    }

    public deleteResource(id: number): Observable<any> {
        const url = this.url + '/' + id.toString(10);
        return this.http.delete(this.url);
    }
}

