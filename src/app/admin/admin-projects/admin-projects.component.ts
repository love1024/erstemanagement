import { AdminProjDataService } from './admin-proj-data.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { Project } from '../../shared/models/admin/project.model';

@Component({
    selector: 'erste-admin-projects',
    templateUrl: './admin-projects.component.html',
    styleUrls: ['./admin-projects.component.scss']
})
export class AdminProjectsComponent implements OnInit {

    displayedColumns = ['id', 'name', 'actions'];
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

        dialogRef.afterClosed().subscribe((project: Project) => {
            if (project !== null && project !== undefined) {
                this.createProject(project);
            }
        });
    }

    createProject(project: Project): void {
        this.dataService.createProject(project).subscribe(res => {
            console.log(res);
            this.refreshDataTable();
        });
    }

    deleteProject(id): void {
        console.log(id);
        this.dataService.deleteProject(id).subscribe(res => {
            this.refreshDataTable();
        });
    }

    editProject(project: Project): void {
        const dialogRef = this.dialog.open(ProjectDialogComponent, { data: project });

        dialogRef.afterClosed().subscribe((project: Project) => {
            if (project !== null && project !== undefined) {
                this.updateProject(project);
            }
        });
    }

    updateProject(project: Project): void {
        this.dataService.updateProject(project).subscribe(res => {
            console.log(res);
            this.refreshDataTable();
        })
    }
}
