import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AdminLevelinfoDataService } from './admin-levelinfo-data.service';
import { LevelInfoDialogComponent } from './level-info-dialog/level-info-dialog.component';
import { Level } from '../../shared/models/admin/level.model';

@Component({
  selector: 'erste-level-info',
  templateUrl: './level-info.component.html',
  styleUrls: ['./level-info.component.scss']
})
export class LevelInfoComponent implements OnInit {

  displayedColumns = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(
    private dataService: AdminLevelinfoDataService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.refreshDataTable();
  }

  refreshDataTable() {
    this.dataService.getLevelsList()
      .subscribe(
        list => {
          this.dataSource = new MatTableDataSource(list);
        }
      );
  }

  openDialog() {
    const dialogRef = this.dialog.open(LevelInfoDialogComponent);
    dialogRef.afterClosed().subscribe((level: Level) => {
      if (level !== null && level !== undefined) {
        this.createNewLevel(level);
      }
    });
  }

  createNewLevel(level: Level): void {
    this.dataService.createLevel(level).subscribe(res => {
      this.refreshDataTable();
    });
  }

  updateLevel(level: Level): void {
    this.dataService.updateLevel(level).subscribe(res => {
      this.refreshDataTable();
    })
  }

  deleteLevel(id): void {
    this.dataService.deleteLevel(id).subscribe(res => {
      this.refreshDataTable();
    })
  }

  editLevel(level: Level): void {
    const dialogRef = this.dialog.open(LevelInfoDialogComponent, { data: level });
    dialogRef.afterClosed().subscribe((level: Level) => {
      if (level !== null && level !== undefined) {
        this.updateLevel(level);
      }
    });
  }

}
