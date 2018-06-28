import { AttendanceDialogComponent } from './../attendance-dialog/attendance-dialog.component';
import { AttdTrackerDataService } from './../shared/attd-tracker-data.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'erste-attd-tracker-home',
    templateUrl: './attd-tracker-home.component.html',
    styleUrls: ['./attd-tracker-home.component.scss']
})
export class AttdTrackerHomeComponent implements OnInit {

    displayedColumns = [
        'resourceId', 'startDate', 'endDate', 'attendanceType', 'approvalDate', 'leaveType', 'reason', 'clientApprovalDate'
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

        dialogRef.afterClosed().subscribe(res => {
            if (res !== null && res !== undefined) {
                console.log(res);
                this.createNewRecord(res);
            }
        });
    }

    createNewRecord(obj): void {
        this.dataService.createNewRecord(obj).subscribe(res => {
            console.log(res);
            this.refreshDataTable();
        });
    }

    deleteResource(id): void {
        console.log(id);
        this.dataService.deleteRecord(id).subscribe(res => {
            this.refreshDataTable();
        });
    }
}
