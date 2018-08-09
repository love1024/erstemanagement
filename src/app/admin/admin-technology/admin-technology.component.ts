import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AdminTechDataService } from './admin-tech-data.service';
import { TechDialogComponent } from './tech-dialog/tech-dialog.component';
import { Technology } from '../../shared/models/admin/technology.model';

@Component({
  selector: 'erste-admin-technology',
  templateUrl: './admin-technology.component.html',
  styleUrls: ['./admin-technology.component.scss']
})
export class AdminTechnologyComponent implements OnInit {
  displayedColumns = ['id', 'name', 'msa_name', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(
    private dataService: AdminTechDataService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.refreshDataTable();
  }

  refreshDataTable() {
    this.dataService.getTechnologyList()
      .subscribe(
        list => {
          this.dataSource = new MatTableDataSource(list);
        }
      );
  }

  openDialog() {
    const dialogRef = this.dialog.open(TechDialogComponent);
    dialogRef.afterClosed().subscribe((technology: Technology) => {
      if (technology !== null && technology !== undefined) {
        this.createNewDepartment(technology);
      }
    });
  }

  createNewDepartment(technology: Technology): void {
    this.dataService.createDepartment(technology).subscribe(res => {
      this.refreshDataTable();
    });
  }

  updateDepartment(technology: Technology): void {
    this.dataService.updateDepartment(technology).subscribe(res => {
      this.refreshDataTable();
    })
  }

  deleteDepartment(id): void {
    this.dataService.deleteDepartment(id).subscribe(res => {
      this.refreshDataTable();
    })
  }

  editDepartment(technology: Technology): void {
    const dialogRef = this.dialog.open(TechDialogComponent, { data: technology });
    dialogRef.afterClosed().subscribe((technology: Technology) => {
      if (technology !== null && technology !== undefined) {
        this.updateDepartment(technology);
      }
    });
  }
}
