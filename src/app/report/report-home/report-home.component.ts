import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../core/login/login.service';
import { AttendanceService } from '../../core/attendance/attendance.service';
import { Attendance } from '../../shared/models/attendance/attendance.model';

@Component({
  selector: 'erste-report-home',
  templateUrl: './report-home.component.html',
  styleUrls: ['./report-home.component.scss']
})
export class ReportHomeComponent implements OnInit {

  data: any;

  constructor(private loginService: LoginService, private attendanceService: AttendanceService) { }

  ngOnInit() {
    const pmId = this.loginService.getManagerId();
    this.attendanceService.getAttendanceByPMId(pmId).subscribe((list: Attendance[]) => {
      this.makeReport(list);
    })
  }

  makeReport(list: Attendance[]) {
    let data = [];
    list.forEach((at) => {
      let contains = data.filter((val) => val.resourceId == at.resourceId);
      if (contains.length > 0) {
        contains[0].ats.push(at);
      } else {
        data.push({ 'resourceId': at.resourceId, 'ats': [at] });
      }
    })

    let finalData = [];
    data.forEach((res) => {
      let tempData = [];
      res['ats'].forEach((at) => {
        let contains = tempData.filter((val) => val.taskId == at.taskId);
        let newTime = { hour: at.hours, date: (new Date(at.date).getDate()) };
        if (contains.length > 0) {
          contains[0].time.push(newTime);
        } else {
          tempData.push({ 'taskId': at.taskId, 'time': [newTime] });
        }
      })
      finalData.push({ 'resourceId': res.resourceId, tasks: tempData });
    })
    this.data = finalData;
  }

}
