import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../shared/models/project/project.model';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url = environment.urls.projectsApi;

  private projectObservable = null;

  constructor(private http: HttpClient) { }

  public getProjects(active: boolean): Observable<Project[]> {
    const url = this.url + "?active=" + active;
    if (this.projectObservable)
      return this.projectObservable;
    else {
      this.projectObservable = this.http.get<Project[]>(url).pipe(shareReplay(1));
      return this.projectObservable;
    }
  }

  public getProjectsByDepartmentId(id: number): Observable<Project[]> {
    this.projectObservable = null;
    const url = this.url + "/department/" + id;
    return this.http.get<Project[]>(url);
  }

  public createProject(project: Project): Observable<any> {
    this.projectObservable = null;
    return this.http.post<any>(this.url, project);
  }

  public updateProject(project: Project): Observable<any> {
    this.projectObservable = null;
    const url = this.url + '/' + project._id;
    return this.http.put(url, project);
  }

  public deleteProject(id) {
    this.projectObservable = null;
    const url = this.url + '/' + id;
    return this.http.delete(url);
  }
}
