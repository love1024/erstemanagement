import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectResource } from '../../shared/models/project/projectResource.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectResourceDataService {

  private url = environment.urls.projectResourceApi;

  constructor(private http: HttpClient) { }

  getProjectResource(active, id): Observable<ProjectResource[]> {
    const url = this.url + "/" + id + "?active=" + active;;
    return this.http.get<ProjectResource[]>(url);
  }

  createProjectResource(projectResource: ProjectResource): Observable<any> {
    return this.http.post<any>(this.url, projectResource);
  }

  updateProjectResource(projectResource: ProjectResource): Observable<any> {
    const url = this.url + "/" + projectResource._id;
    return this.http.put(url, projectResource);
  }

  deleteProjectResource(id): Observable<any> {
    const url = this.url + "/" + id;
    return this.http.delete(url);
  }
}
