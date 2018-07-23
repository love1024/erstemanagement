import { MatTableDataSource, MatDialog } from '@angular/material';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ResourceEditorComponent } from '../resource-editor/resource-editor.component';
import { Resource } from 'src/app/shared/models/admin/resource.model';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ResourceService } from '../../core/resource/resource.service';

@Component({
    selector: 'erste-resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss'],
    animations: [
        trigger('smoothInOut', [
            state('in', style({ 'min-height': '30px', 'height': 'auto' })),
            transition('void => *', [
                style({ 'min-height': '0', 'height': '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(200, style({ 'height': '0' }))
            ])
        ]),
        trigger('fadeOut', [
            transition('* => void', [
                animate(200, style({ 'height': '0' }))
            ])
        ]),
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})
export class ResourcesComponent implements OnInit {

    displayedColumns = ['id', 'name', 'email'];
    dataSource = new MatTableDataSource();
    currentResource: Resource;
    buttonMessage = "Entry";
    isOpen = false;
    isLoading = true;

    constructor(
        private dataService: ResourceService,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.refreshDataTable();
    }

    refreshDataTable() {
        this.isLoading = true;
        this.dataService.getResourceList(true)
            .subscribe(
                list => {
                    this.dataSource = new MatTableDataSource(this.addDetailColumn(list));
                    this.isLoading = false;
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

    onRowClick(resource: Resource) {
        if (resource == this.currentResource)
            this.currentResource = null;
        else
            this.currentResource = resource;
    }

    addDetailColumn(list: Resource[]) {
        const rows = [];
        list.forEach(element => rows.push(element, { editor: true, element }));
        return rows;
    }
}
