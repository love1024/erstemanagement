import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginService } from '../../../core/login/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'erste-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  inputForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.inputForm = this.formBuilder.group({
      startDate: [new Date(), [Validators.required]],
      endDate: [new Date(), [Validators.required]],
      type: ['wfh', [Validators.required]]
    });
  }

  onSubmit(isValid) {
    if (isValid) {
      if (this.inputForm.value.type == "wfh")
        this.publishWFH();
      else
        this.publishLeave();
    }
  }

  publishWFH() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    let params = new HttpParams().set("start", this.inputForm.value.startDate.getTime()).set("end", this.inputForm.value.endDate.getTime());
    const url = "http://localhost:3000/publish/attendance/" + this.loginService.getManagerId();
    this.http.get(url, { headers: headers, responseType: 'blob', params: params }).subscribe((blob) => {
      var url = window.URL.createObjectURL(blob);
      window.open(url)
    });
  }

  publishLeave() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    let params = new HttpParams().set("start", this.inputForm.value.startDate.getTime()).set("end", this.inputForm.value.endDate.getTime());
    const url = "http://localhost:3000/publish/leave/" + this.loginService.getManagerId();;
    this.http.get(url, { headers: headers, responseType: 'blob', params: params }).subscribe((blob) => {
      var url = window.URL.createObjectURL(blob);
      window.open(url)
    });
  }
}
