import { ResourcesDataService } from './resources-data.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ResourceEditorComponent } from '../resource-editor/resource-editor.component';
import { Resource } from 'src/app/shared/models/admin/resource.model';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
    selector: 'erste-resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss'],
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
        ])
    ]
})
export class ResourcesComponent implements OnInit {

    displayedColumns = ['id', 'name', 'email'];
    dataSource = new MatTableDataSource();
    isOpen = false;
    currentResource: Resource;
    buttonMessage = "New Entry";

    constructor(
        private dataService: ResourcesDataService,
        private dialog: MatDialog,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.refreshDataTable();
    }

    refreshDataTable() {
        this.dataService.getResourceList(true)
            .subscribe(
                list => {
                    console.log(list);
                    this.dataSource = new MatTableDataSource(list);
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
        this.buttonMessage = 'Close Form';
        this.renderer.setStyle(icon, 'transform', 'rotate(45deg)')
        this.isOpen = true;
    }

    closeDialog() {
        let icon = document.getElementsByClassName('fa-plus')[0];
        this.buttonMessage = 'New Record';
        this.renderer.setStyle(icon, 'transform', 'rotate(0deg)')
        this.isOpen = false;
        this.currentResource = null;
    }

    onRowClick(resource: Resource): void {
        console.log(resource);
        this.currentResource = resource;
        this.openDialog();
    }
}
