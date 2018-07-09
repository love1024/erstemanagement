import { AdminResourcesDataService } from './admin-resources-data.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ResourceDialogComponent } from './resource-dialog/resource-dialog.component';
import { Resource } from 'src/app/shared/models/admin/resource.model';

@Component({
    selector: 'erste-admin-resources',
    templateUrl: './admin-resources.component.html',
    styleUrls: ['./admin-resources.component.scss']
})
export class AdminResourcesComponent implements OnInit {

    displayedColumns = ['id', 'name', 'actions'];
    dataSource = new MatTableDataSource();

    constructor(
        private dataService: AdminResourcesDataService,
        private dialog: MatDialog
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
    }

    openDialog() {
        const dialogRef = this.dialog.open(ResourceDialogComponent, { disableClose: true });

        dialogRef.afterClosed().subscribe((resource: Resource) => {
            if (resource !== null && resource !== undefined) {
                this.createResource(resource);
            }
        });
    }

    createResource(resource: Resource): void {
        this.dataService.createResource(resource).subscribe(res => {
            console.log(res);
            this.refreshDataTable();
        });
    }

    deleteResource(id): void {
        console.log(id);
        this.dataService.deleteResource(id).subscribe(res => {
            this.refreshDataTable();
        });
    }

    updateResource(resource: Resource): void {
        this.dataService.updateResource(resource).subscribe(res => {
            console.log(res);
            this.refreshDataTable();
        })
    }

    editResource(resource): void {
        const dialogRef = this.dialog.open(ResourceDialogComponent, { disableClose: true, data: resource });

        dialogRef.afterClosed().subscribe(data => {
            let oldResource = <Resource>data.old;
            let newResource = <Resource>data.new;
            if (this.checkDefined(oldResource) && this.checkDefined(newResource)) {
                oldResource.dateUntil = new Date();
                oldResource.active = false;
                this.updateResource(oldResource);
                this.createResource(newResource);
            }
        });
    }

    checkDefined(resource: Resource): boolean {
        if (resource != null && resource != undefined)
            return true;
        return false;
    }
}
