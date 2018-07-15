import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Project } from '../../shared/models/project/project.model';
import { ProjectService } from '../../core/project/project.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
    selector: 'erste-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
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
export class ProjectComponent implements OnInit {

    displayedColumns = ['id', 'name', 'modelName', 'resources'];
    dataSource = new MatTableDataSource();
    isOpen = false;
    currentProject: Project;
    buttonMessage = "Entry";

    constructor(
        private dataService: ProjectService,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.refreshDataTable();
    }

    refreshDataTable() {
        this.dataService.getProjects(true)
            .subscribe(
                list => {
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

    onRowClick(project: Project) {
        if (project == this.currentProject)
            this.currentProject = null;
        else
            this.currentProject = project;
    }

    addDetailColumn(list: Project[]) {
        const rows = [];
        list.forEach(element => rows.push(element, { editor: true, element }));
        return rows;
    }
}
