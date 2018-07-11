import { ProjectHomeService } from './project-home-data.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { Project } from '../../shared/models/project/project.model';

@Component({
    selector: 'erste-projects',
    templateUrl: './project-home.component.html',
    styleUrls: ['./project-home.component.scss']
})
export class ProjectHomeComponent implements OnInit {

    displayedColumns = ['id', 'name', 'modelName', 'resources', 'actions'];
    dataSource = new MatTableDataSource();

    constructor(
        private dataService: ProjectHomeService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.refreshDataTable();
    }

    refreshDataTable() {
        this.dataService.getProjects(true)
            .subscribe(
                list => {
                    this.dataSource = new MatTableDataSource(list);
                }
            );
    }

    openDialog() {
        const dialogRef = this.dialog.open(ProjectDialogComponent);

        dialogRef.afterClosed().subscribe(data => {
            if (this.checkDefined(data) && this.checkDefined(data.new)) {
                this.createProject(data.new);
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

        dialogRef.afterClosed().subscribe(data => {
            let oldProject = <Project>data.old;
            let newProject = <Project>data.new;
            if (this.checkDefined(oldProject) && this.checkDefined(newProject)) {
                oldProject.dateUntil = new Date();
                oldProject.active = false;
                this.updateProject(oldProject);
                this.createProject(newProject);
            }
        });
    }

    updateProject(project: Project): void {
        this.dataService.updateProject(project).subscribe(res => {
            console.log(res);
            this.refreshDataTable();
        })
    }

    checkDefined(project: Project): boolean {
        if (project != null && project != undefined)
            return true;
        return false;
    }
}
