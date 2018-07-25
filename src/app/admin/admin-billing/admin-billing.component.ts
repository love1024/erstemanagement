import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AdminBillingDataService } from './admin-billing-data.service';
import { BillingRate } from '../../shared/models/admin/billing.model';
import { BillingDialogComponent } from './billing-dialog/billing-dialog.component';
import { CompareService } from '../../core/compare/compare.service';
import { SnackbarService } from '../../core/snackbar/snackbar.service';
import { Technology } from '../../shared/models/admin/technology.model';
import { AdminTechDataService } from '../admin-technology/admin-tech-data.service';
import { Level } from '../../shared/models/admin/level.model';
import { AdminLevelinfoDataService } from '../level-info/admin-levelinfo-data.service';

@Component({
  selector: 'erste-admin-billing',
  templateUrl: './admin-billing.component.html',
  styleUrls: ['./admin-billing.component.scss']
})
export class AdminBillingComponent implements OnInit {

  displayedColumns = ['id', 'technologyName', 'levelId', 'actions'];
  dataSource = new MatTableDataSource();
  technologies: Technology[];
  levels: Level[];

  constructor(
    private dataService: AdminBillingDataService,
    private technologyService: AdminTechDataService,
    private levelService: AdminLevelinfoDataService,
    private compareService: CompareService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.refreshDataTable();
    this.technologyService.getTechnologyList().subscribe((technologies: Technology[]) => {
      this.technologies = technologies;
    })
    this.levelService.getLevelsList().subscribe((levels: Level[]) => {
      this.levels = levels;
    })
  }

  refreshDataTable() {
    this.dataService.getBillingRateList(true)
      .subscribe(
        list => {
          console.log(list);
          this.dataSource = new MatTableDataSource(list);
        }
      );
  }

  openDialog() {
    const dialogRef = this.dialog.open(BillingDialogComponent);
    dialogRef.afterClosed().subscribe((data: any) => {
      if (!data)
        return;
      if (this.checkDefined(data.new)) {
        this.createNewBillingRate(data.new);
      }
    });
  }

  createNewBillingRate(billingRate: BillingRate): void {
    this.dataService.createBillingRate(billingRate).subscribe(res => {
      console.log(res);
      this.refreshDataTable();
    });
  }

  updateBillingRate(billingRate: BillingRate): void {
    this.dataService.updateBillingRate(billingRate).subscribe(res => {
      console.log(res);
      this.refreshDataTable();
    })
  }

  deleteBillingRate(id): void {
    this.dataService.deleteBillingRate(id).subscribe(res => {
      console.log(res);
      this.refreshDataTable();
    })
  }

  editBillingRate(billingRate: BillingRate): void {
    const dialogRef = this.dialog.open(BillingDialogComponent, { data: billingRate });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (!data)
        return;
      const oldBillingRate = <BillingRate>data.old
      const newBillingRate = <BillingRate>data.new;
      let isEqual = this.compareService.isEqual(oldBillingRate, newBillingRate);
      if (isEqual) {
        this.snackbarService.open("Form is not changed");
        return;
      }
      if (this.checkDefined(oldBillingRate) && this.checkDefined(newBillingRate)) {
        oldBillingRate.dateUntil = new Date();
        oldBillingRate.active = false;
        this.updateBillingRate(oldBillingRate);
        this.createNewBillingRate(newBillingRate);
      }
    });
  }

  checkDefined(billingRate: BillingRate): boolean {
    if (billingRate != null && billingRate !== undefined) {
      return true;
    }
    return false;
  }

  getTechnologyName(technologyId: number) {
    let ret = this.technologies.filter((tech) => tech.technologyId == technologyId);
    return ret[0].technologyName;
  }

  getLevelName(levelId: number) {
    let ret = this.levels.filter((level) => level.levelId == levelId);
    return ret[0].levelName;
  }
}
