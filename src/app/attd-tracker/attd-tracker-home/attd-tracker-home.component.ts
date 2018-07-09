import { AttendanceDialogComponent } from './../attendance-dialog/attendance-dialog.component';
import { AttdTrackerDataService } from './../shared/attd-tracker-data.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Attendance } from '../../shared/models/attendance/attendance.model';

@Component({
    selector: 'erste-attd-tracker-home',
    templateUrl: './attd-tracker-home.component.html',
    styleUrls: ['./attd-tracker-home.component.scss']
})
export class AttdTrackerHomeComponent implements OnInit {

    selectYears = [{ value: 2018 }];
    selectMonths = [{ value: 1, name: 'January' }, { value: 2, name: 'February' }, { value: 3, name: 'March' }];
    selectProjects = [];

    displayedColumns = [
        'resourceId', 'date', 'attendanceType', 'remarks', 'actions'
    ];
    dataSource = new MatTableDataSource();

    constructor(
        private dataService: AttdTrackerDataService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.refreshDataTable();
    }

    refreshDataTable() {
        this.dataService.getAttendanceList()
            .subscribe(
                list => {
                    console.log(list);
                    this.dataSource = new MatTableDataSource(list);
                }
            );
    }

    openDialog() {
        const dialogRef = this.dialog.open(AttendanceDialogComponent);

        dialogRef.afterClosed().subscribe((attendance: Attendance) => {
            if (attendance !== null && attendance !== undefined) {
                console.log(attendance);
                this.createNewAttendace(attendance);
            }
        });
    }

    createNewAttendace(attendance: Attendance): void {
        this.dataService.createNewAttendace(attendance).subscribe(res => {
            console.log(res);
            this.refreshDataTable();
        });
    }

    deleteAttendance(id): void {
        this.dataService.deleteAttendance(id).subscribe(res => {
            this.refreshDataTable();
        });
    }

    updateAttendance(attendance: Attendance) {
        this.dataService.updateAttendance(attendance).subscribe(res => {
            console.log(res);
            this.refreshDataTable();
        })
    }

    editAttendance(attendance: Attendance) {
        const dialogRef = this.dialog.open(AttendanceDialogComponent, { data: attendance });

        dialogRef.afterClosed().subscribe((attendance: Attendance) => {
            if (attendance !== null && attendance !== undefined) {
                console.log(attendance);
                this.updateAttendance(attendance);
            }
        });
    }
}
