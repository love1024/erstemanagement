import { AdminProjDataService } from './admin-proj-data.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';

@Component({
    selector: 'erste-admin-projects',
    templateUrl: './admin-projects.component.html',
    styleUrls: ['./admin-projects.component.scss']
})
export class AdminProjectsComponent implements OnInit {

    displayedColumns = ['id', 'name'];
    dataSource = new MatTableDataSource();

    constructor(
        private dataService: AdminProjDataService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.refreshDataTable();
    }

    refreshDataTable() {
        this.dataService.getProjects()
            .subscribe(
                list => {
                    this.dataSource = new MatTableDataSource(list);
                }
            );
    }

    openDialog() {
        const dialogRef = this.dialog.open(ProjectDialogComponent);

        dialogRef.afterClosed().subscribe(res => {
            if (res !== null && res !== undefined) {
                this.createProject(res);
            }
        });
    }

    createProject(obj): void {
        this.dataService.createProject(obj).subscribe(res => {
            console.log(res);
            this.refreshDataTable();
        });
    }
}
