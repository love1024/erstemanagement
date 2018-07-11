import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ProjectResourceDataService } from './project-resource-data.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectResourceDialogComponent } from './project-resource-dialog/project-resource-dialog.component';
import { ProjectResource } from '../../shared/models/project/projectResource.model';

@Component({
  selector: 'erste-project-resource',
  templateUrl: './project-resource.component.html',
  styleUrls: ['./project-resource.component.scss']
})
export class ProjectResourceComponent implements OnInit {

  displayedColumns = ['projectId', 'resourceId', 'resourceAllocation', 'actions'];
  dataSource = new MatTableDataSource();
  projectId: String;

  constructor(
    private dataService: ProjectResourceDataService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get("id");
    this.refreshDataTable();
  }

  refreshDataTable() {
    this.dataService.getProjectResource(true, this.projectId)
      .subscribe(
        list => {
          console.log(list);
          this.dataSource = new MatTableDataSource(list);
        }
      );
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectResourceDialogComponent, { data: { projectId: this.projectId } });

    dialogRef.afterClosed().subscribe(data => {
      if (this.checkDefined(data) && this.checkDefined(data.new)) {
        this.createProject(data.new);
      }
    });
  }

  createProject(projectResource: ProjectResource): void {
    this.dataService.createProjectResource(projectResource).subscribe(res => {
      console.log(res);
      this.refreshDataTable();
    });
  }

  editProjectResource(projectResource: ProjectResource): void {
    const dialogRef = this.dialog.open(ProjectResourceDialogComponent, { data: { projectResource: projectResource, projectId: this.projectId } });

    dialogRef.afterClosed().subscribe(data => {
      if (!data) { }
      let oldProjectResource = <ProjectResource>data.old;
      let newProjectResource = <ProjectResource>data.new;
      if (this.checkDefined(oldProjectResource) && this.checkDefined(newProjectResource)) {
        oldProjectResource.dateUntil = new Date();
        oldProjectResource.active = false;
        this.updateProject(oldProjectResource);
        this.createProject(newProjectResource);
      }
    });
  }

  updateProject(projectResource: ProjectResource): void {
    this.dataService.updateProjectResource(projectResource).subscribe(res => {
      console.log(res);
      this.refreshDataTable();
    })
  }

  deleteProjectResource(id): void {
    console.log(id);
    this.dataService.deleteProjectResource(id).subscribe(res => {
      this.refreshDataTable();
    });
  }

  checkDefined(project: ProjectResource): boolean {
    if (project != null && project != undefined)
      return true;
    return false;
  }

}
