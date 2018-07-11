import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../shared/models/project/project.model';
@Injectable({
    providedIn: 'root'
})
export class ProjectHomeService {

    private url = environment.urls.projectsApi;

    constructor(private http: HttpClient) { }

    public getProjects(active: boolean): Observable<Project[]> {
        const url = this.url + "?active=" + active;
        return this.http.get<Project[]>(url);
    }

    public createProject(project: Project): Observable<any> {
        return this.http.post<any>(this.url, project);
    }

    public updateProject(project: Project): Observable<any> {
        const url = this.url + '/' + project._id;
        return this.http.put(url, project);
    }

    public deleteProject(id) {
        const url = this.url + '/' + id;
        return this.http.delete(url);
    }
}
