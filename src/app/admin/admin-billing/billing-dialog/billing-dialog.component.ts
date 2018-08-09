import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BillingRate } from '../../../shared/models/admin/billing.model';
import { Technology } from '../../../shared/models/admin/technology.model';
import { Level } from '../../../shared/models/admin/level.model';
import { AdminTechDataService } from '../../admin-technology/admin-tech-data.service';
import { AdminLevelinfoDataService } from '../../level-info/admin-levelinfo-data.service';

@Component({
  selector: 'erste-billing-dialog',
  templateUrl: './billing-dialog.component.html',
  styleUrls: ['./billing-dialog.component.scss']
})
export class BillingDialogComponent implements OnInit {

  inputForm: FormGroup;
  technologies: Technology[];
  levels: Level[];

  constructor(
    private formBuilder: FormBuilder,
    private technologyService: AdminTechDataService,
    private levelService: AdminLevelinfoDataService,
    public dialogRef: MatDialogRef<BillingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public billingRate: BillingRate) { }

  ngOnInit() {
    if (this.billingRate !== null) {
      this.createEditForm(this.billingRate);
    } else {
      this.createForm();
    }
    this.technologyService.getTechnologyList().subscribe((technologies: Technology[]) => {
      this.technologies = technologies;
    })
    this.levelService.getLevelsList().subscribe((levels: Level[]) => {
      this.levels = levels;
    })
  }

  createForm(): void {
    this.inputForm = this.formBuilder.group({
      technologyId: ['', Validators.required],
      resourceLevelId: ['', Validators.required],
      resourceOffshoreRate: ['', Validators.required],
      resourceOnshoreShorttermRate: ['', Validators.required],
      resourceOnshoreLongtermRate: ['', Validators.required],
      resourceOncallStandbyRate: ['', Validators.required],
      resourceOncallSupportWeekdayRate: ['', Validators.required],
      resourceOncallSupportWeekendRate: ['', Validators.required],
      active: [true, Validators.required],
      dateFrom: [Date.now()],
      dateUntil: [null],
      fipUser: ['test'],
      fipProg: ['Web'],
      fipTst: [Date.now()]
    });
  }

  createEditForm(billingRate: BillingRate): void {
    this.inputForm = this.formBuilder.group({
      billingId: [billingRate.billingId, Validators.required],
      technologyId: [billingRate.technologyId, Validators.required],
      resourceLevelId: [billingRate.resourceLevelId, Validators.required],
      resourceOffshoreRate: [billingRate.resourceOffshoreRate, Validators.required],
      resourceOnshoreShorttermRate: [billingRate.resourceOnshoreShorttermRate, Validators.required],
      resourceOnshoreLongtermRate: [billingRate.resourceOnshoreLongtermRate, Validators.required],
      resourceOncallStandbyRate: [billingRate.resourceOncallStandbyRate, Validators.required],
      resourceOncallSupportWeekdayRate: [billingRate.resourceOncallSupportWeekdayRate, Validators.required],
      resourceOncallSupportWeekendRate: [billingRate.resourceOncallSupportWeekendRate, Validators.required],
      active: [true, Validators.required],
      dateFrom: [billingRate.dateFrom],
      dateUntil: [billingRate.dateUntil],
      fipUser: [billingRate.fipUser],
      fipProg: [billingRate.fipProg],
      fipTst: [billingRate.fipTst]
    });
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      let data = { new: this.inputForm.value, old: this.billingRate }
      this.dialogRef.close(data);
    }
  }

}
