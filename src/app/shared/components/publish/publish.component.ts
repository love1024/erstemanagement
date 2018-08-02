import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'erste-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  publishWFH() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const url = "http://localhost:3000/publish/attendance"
    this.http.get(url, { headers: headers, responseType: 'blob' }).subscribe((blob) => {
      var url = window.URL.createObjectURL(blob);
      window.open(url)
    });
  }

  publishLeave() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    const url = "http://localhost:3000/publish/leave"
    this.http.get(url, { headers: headers, responseType: 'blob' }).subscribe((blob) => {
      var url = window.URL.createObjectURL(blob);
      window.open(url)
    });
  }
}
