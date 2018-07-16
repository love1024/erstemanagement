import { MatTableDataSource, MatDialog } from '@angular/material';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Attendance } from '../../shared/models/attendance/attendance.model';
import { AttendanceService } from '../../core/attendance/attendance.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
    selector: 'erste-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss'],
    animations: [
        trigger('smoothInOut', [
            state('in', style({ 'height': 'auto' })),
            transition('void => *', [
                style({ 'height': '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(200, style({ 'height': '0' }))
            ])
        ]),
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
            state('expanded', style({ height: '*', visibility: 'visible' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})
export class AttendanceComponent implements OnInit {

    selectYears = [{ value: 2018 }];
    selectMonths = [{ value: 1, name: 'January' }, { value: 2, name: 'February' }, { value: 3, name: 'March' }];
    selectProjects = [];

    displayedColumns = ['resourceId', 'date', 'attendanceType', 'remarks'];
    dataSource = new MatTableDataSource();
    isOpen = false;
    currentAttendance: Attendance;
    buttonMessage = "Entry";

    constructor(
        private dataService: AttendanceService,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.refreshDataTable();
    }

    refreshDataTable() {
        console.log(this.dataService);
        this.dataService.getAttendanceList()
            .subscribe(
                list => {
                    console.log(list);
                    this.dataSource = new MatTableDataSource(this.addDetailColumn(list));
                }
            );
        this.closeDialog();
    }

    toggleDialog() {
        if (this.isOpen) {
            this.closeDialog();
        } else {
            this.openDialog();
        }
    }

    openDialog() {
        let icon = document.getElementsByClassName('fa-plus')[0];
        this.buttonMessage = 'Close';
        this.renderer.setStyle(icon, 'transform', 'rotate(45deg)')
        this.isOpen = true;
    }

    closeDialog() {
        let icon = document.getElementsByClassName('fa-plus')[0];
        this.buttonMessage = 'Entry';
        this.renderer.setStyle(icon, 'transform', 'rotate(0deg)')
        this.isOpen = false;
    }

    isExpansionDetailRow(i: number, row: Object) {
        return row.hasOwnProperty('editor');
    }

    onRowClick(attendance: Attendance) {
        if (attendance == this.currentAttendance)
            this.currentAttendance = null;
        else
            this.currentAttendance = attendance;
    }

    addDetailColumn(list: Attendance[]) {
        const rows = [];
        list.forEach(element => rows.push(element, { editor: true, element }));
        return rows;
    }
}
