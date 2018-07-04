import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../shared/models/admin/project.model';
@Injectable({
    providedIn: 'root'
})
export class AdminProjDataService {

    private url = environment.urls.projectsApi;

    constructor(private http: HttpClient) { }

    public getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.url);
    }

    public createProject(project: Project): Observable<any> {
        return this.http.post<any>(this.url, project);
    }
}
