import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { SnackbarService } from '../../../core/snackbar/snackbar.service';

@Component({
  selector: 'erste-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  data: any;

  constructor(private http: HttpClient, private snackbarService: SnackbarService) { }

  ngOnInit() {

  }

  parseFile(e) {
    const target: DataTransfer = <DataTransfer>(e.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      let data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      //this.data = data;
      this.sendFile(data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  sendFile(data) {
    const url = "http://localhost:3000/job/attendance";
    this.http.post(url, data).subscribe((res) => {
      this.snackbarService.open("Job Completed");
    })
  }

}
