import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ProjectResource } from '../../shared/models/project/projectResource.model';
import { ProjectResourceService } from '../../core/project/project-resource.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'erste-project-resource',
  templateUrl: './project-resource.component.html',
  styleUrls: ['./project-resource.component.scss'].,
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
export class ProjectResourceComponent implements OnInit {

  displayedColumns = ['projectId', 'resourceId', 'resourceAllocation'];
  dataSource = new MatTableDataSource();
  projectId: String;
  isOpen = false;
  currentProjectResource: ProjectResource;
  buttonMessage = "Entry";

  constructor(
    private dataService: ProjectResourceService,
    private renderer: Renderer2,
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

  onRowClick(projectResource: ProjectResource) {
    if (projectResource == this.currentProjectResource)
      this.currentProjectResource = null;
    else
      this.currentProjectResource = projectResource;
  }

  addDetailColumn(list: ProjectResource[]) {
    const rows = [];
    list.forEach(element => rows.push(element, { editor: true, element }));
    return rows;
  }
}
