import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../shared/models/task/task.model';
import { environment } from '../../../environments/environment';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = environment.urls.taskApi;
  private taskObservable = null;

  constructor(private http: HttpClient) { }

  getTaskList(active: boolean): Observable<Task[]> {
    const url = this.url + "?active=" + active;
    if (this.taskObservable)
      return this.taskObservable;
    else {
      this.taskObservable = this.http.get<Task[]>(url).pipe(shareReplay(1));
      return this.taskObservable;
    }
  }

  public createTask(task: Task): Observable<any> {
    this.taskObservable = null;
    return this.http.post<any>(this.url, task);
  }

  public updateTask(task: Task): Observable<any> {
    this.taskObservable = null;
    const url = this.url + "/" + task.taskId;
    return this.http.put<any>(url, task);
  }

  public deleteTask(id): Observable<any> {
    this.taskObservable = null;
    const url = this.url + "/" + id;
    return this.http.delete<any>(url);
  }

}
