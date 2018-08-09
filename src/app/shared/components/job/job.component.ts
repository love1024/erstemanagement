import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'erste-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  parseFile(e) {
    let file = e.target.files[0];
    if (file) {
      let formData = new FormData();
      formData.append('file', file, file.name);
      let params = new HttpParams();

      const options = {
        params: params,
        reportProgress: true,
      };
      const url = "http://localhost:3000/job/attendance";
      this.http.post(url, formData, options).subscribe((res) => {
        console.log(res);
      });
    }
  }

}
