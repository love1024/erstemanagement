import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AttendanceService } from '../../core/attendance/attendance.service';
import { ResourceService } from '../../core/resource/resource.service';
import { LoginService } from '../../core/login/login.service';
import { Attendance } from '../../shared/models/attendance/attendance.model';
import { TaskService } from '../../core/task/task.service';

@Component({
  selector: 'erste-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  animations: [
    trigger('smoothInOut', [
      state('in', style({ 'min-height': '30px', 'height': 'auto' })),
      transition('void => *', [
        style({ 'min-height': '0', 'height': '0' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ 'height': '0' }))
      ])
    ]),
    trigger('fadeOut', [
      transition('* => void', [
        animate(200, style({ 'height': '0' }))
      ])
    ]),
  ]
})
export class ReportsComponent implements OnInit {

  @Input() resource;
  @Input() isTop;
  resourceId: number;
  dataSource = new MatTableDataSource();
  tasks: any;
  displayedColumns = ['task'];
  dates = [];
  isLoading = true;

  constructor(
    private resourceService: ResourceService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.isLoading = false;
    for (let i = 1; i <= 31; i++) {
      this.dates.push(i);
      this.displayedColumns.push(i + "");
    }
    this.resource.tasks.push({ 'isLast': true, 'element': this.resource.tasks[this.resource.tasks.length - 1] })
    this.insertExtraRow();
    console.log(this.resource.tasks);
    this.dataSource = new MatTableDataSource(this.resource.tasks);
    this.resourceId = this.resource.resourceId;
    this.taskService.getTaskList(true).subscribe((tasks) => {
      this.tasks = tasks;
    })
  }

  isLast(i: number, row: any) {
    return row.hasOwnProperty('isLast');
  }

  insertExtraRow() {
    let len = this.resource.tasks.length;
    if (len > 1) {
      this.resource.tasks.splice(len - 1, 0, { 'taskId': '', 'hours': [] });
    } else {
      this.resource.tasks.push({ 'taskId': '', 'hours': [] });
    }
  }

}
