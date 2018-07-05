import { DeptDialogComponent } from './dept-dialog/dept-dialog.component';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AdminDeptDataService } from './admin-dept-data.service';
import { Component, OnInit } from '@angular/core';
import { Department } from '../../shared/models/admin/department.model';

@Component({
    selector: 'erste-admin-departments',
    templateUrl: './admin-departments.component.html',
    styleUrls: ['./admin-departments.component.scss']
})
export class AdminDepartmentsComponent implements OnInit {

    displayedColumns = ['name', 'hod', 'hod_email', 'actions'];
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
        dialogRef.afterClosed().subscribe((department: Department) => {
            if (department !== null && department !== undefined) {
                this.createNewDepartment(department);
            }
        });
    }

    createNewDepartment(department: Department): void {
        this.dataService.createDepartment(department).subscribe(res => {
            console.log(res);
            this.refreshDataTable();
        });
    }

    updateDepartment(department: Department): void {
        this.dataService.updateDepartment(department).subscribe(res => {
            console.log(res);
            this.refreshDataTable();
        })
    }

    deleteDepartment(id): void { 
        this.dataService.deleteDepartment(id).subscribe(res => { 
            console.log(res);
            this.refreshDataTable();
        })
    }

    editDepartment(department: Department): void {
        const dialogRef = this.dialog.open(DeptDialogComponent, { data: department });
        dialogRef.afterClosed().subscribe((department: Department) => {
            if (department !== null && department !== undefined) {
                this.updateDepartment(department);
            }
        });
    }
}
