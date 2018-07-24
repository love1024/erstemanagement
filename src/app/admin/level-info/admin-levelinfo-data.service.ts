import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Level } from '../../shared/models/admin/level.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminLevelinfoDataService {

  private url = environment.urls.levelInfoApi;

  private levelObservable = null;

  constructor(private http: HttpClient) { }

  getLevelsList(): Observable<Level[]> {
    if (this.levelObservable)
      return this.levelObservable;
    else {
      this.levelObservable = this.http.get<Level[]>(this.url).pipe(shareReplay(1));
      return this.levelObservable;
    }
  }

  createLevel(level: Level): Observable<any> {
    return this.http.post(this.url, level);
  }

  deleteLevel(id): Observable<any> {
    const url = this.url + "/" + id;
    return this.http.delete(url);
  }

  updateLevel(level: Level) {
    const url = this.url + "/" + level.levelId;
    return this.http.put(url, level);
  }
}
