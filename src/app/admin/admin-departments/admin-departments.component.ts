import { DeptDialogComponent } from './dept-dialog/dept-dialog.component';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AdminDeptDataService } from './admin-dept-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'erste-admin-departments',
    templateUrl: './admin-departments.component.html',
    styleUrls: ['./admin-departments.component.scss']
})
export class AdminDepartmentsComponent implements OnInit {

    displayedColumns = ['id', 'name', 'hod', 'hod_email', 'actions'];
    dataSource = new MatTableDataSource();

    constructor(
        private dataService: AdminDeptDataService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.refreshDataTable();
    }

    refreshDataTable() {
        this.dataService.getDepartmentList()
            .subscribe(
                list => {
                    this.dataSource = new MatTableDataSource(list);
                }
            );
    }

    openDialog() {
        const dialogRef = this.dialog.open(DeptDialogComponent);

        dialogRef.afterClosed().subscribe(res => {
            if (res !== null && res !== undefined) {
                this.createNewDepartment(res);
            }
        });
    }

    createNewDepartment(obj): void {
        this.dataService.createDepartment(obj).subscribe(res => {
            console.log(res);
            this.refreshDataTable();
        });
    }
}
