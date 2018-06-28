import { AdminResourcesDataService } from './admin-resources-data.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ResourceDialogComponent } from './resource-dialog/resource-dialog.component';

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
        this.dataService.getResourceList()
            .subscribe(
                list => {
                    console.log(list);
                    this.dataSource = new MatTableDataSource(list);
                }
            );
    }

    openDialog() {
        const dialogRef = this.dialog.open(ResourceDialogComponent);

        dialogRef.afterClosed().subscribe(res => {
            if (res !== null && res !== undefined) {
                console.log(res);
                this.createResource(res);
            }
        });
    }

    createResource(obj): void {
        this.dataService.createResource(obj).subscribe(res => {
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
}
