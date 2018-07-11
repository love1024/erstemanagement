import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Level } from '../../shared/models/admin/level.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminLevelinfoDataService {

  private url = environment.urls.levelInfoApi;

  constructor(private http: HttpClient) { }

  getLevelsList(): Observable<Level[]> {
    return this.http.get<Level[]>(this.url);
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
