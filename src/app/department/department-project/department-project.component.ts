import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ProjectService } from '../../core/project/project.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'erste-department-project',
  templateUrl: './department-project.component.html',
  styleUrls: ['./department-project.component.scss'],
  animations: [
    trigger('smoothInOut', [
      state('in', style({ 'min-height': '30px', 'height': 'auto' })),
      transition('void => *', [
        style({ 'min-height': '0', 'height': '0' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ 'min-height': '0', 'height': '0' }))
      ])
    ])
  ]
})
export class DepartmentProjectComponent implements OnInit {

  displayedColumns = ['projectName', 'projectPM', 'projectTAM'];
  dataSource = new MatTableDataSource();
  isLoading = false;
  @Input() departmentId: number;

  constructor(
    private projectService: ProjectService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    // this.refreshDataTable();
  }

  ngOnChanges() {
    //Using timeout for smooth animations
    setTimeout(() => {
      this.refreshDataTable();
    }, 500)
  }

  refreshDataTable() {
    this.isLoading = true;
    this.dataSource = null;
    this.projectService.getProjectsByDepartmentId(this.departmentId)
      .subscribe(
        list => {
          console.log(list);
          this.dataSource = new MatTableDataSource(list);
          this.isLoading = false;
        }
      );
  }

}
