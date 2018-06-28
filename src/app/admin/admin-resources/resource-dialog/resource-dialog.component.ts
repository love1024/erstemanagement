import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'erste-resource-dialog',
    templateUrl: './resource-dialog.component.html',
    styleUrls: ['./resource-dialog.component.scss']
})
export class ResourceDialogComponent implements OnInit {

    inputForm: FormGroup;
    projects = [{ id: 1, name: 'cockpit' }, { id: 2, name: 'ilease' }];
    levels = [{ id: 1, name: 'L1' }, { id: 2, name: 'L2' }];
    billingList = [{ id: 1, name: 'LVL1 Mainframe' }, { id: 2, name: 'LVL2 Mainframe' }];

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ResourceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        if (this.data !== null && this.data.project !== null) {
            this.createEditForm(this.data.project);
        } else {
            this.createForm();
        }
    }

    onNoClick(): void {
        this.dialogRef.close(null);
    }

    createForm(): void {
        this.inputForm = this.formBuilder.group({
            resourceId: [, []],
            resourceName: ['', [Validators.required]],
            resourceEmail: ['', [Validators.required]],
            resourceErsteJoiningDate: ['', [Validators.required]],
            resourceProjectId: ['', [Validators.required]],
            resourceCertifications: ['', [Validators.required]],
            resourceAllocation: ['', [Validators.required]],
            resourceAllocationEndDate: ['', [Validators.required]],
            resourceLevelMsaName: ['', [Validators.required]],
            resourceBillingId: ['', [Validators.required]],
            levelChangeStartDate: ['', [Validators.required]],
            levelChangeEndDate: ['', []],
            resourceLevelId: ['', [Validators.required]],
            resourceIsBillable: ['', []],
            resourceIsPM: ['', []],
            isNagarroTAM: ['', []],
        });
    }

    createEditForm(project): void {
        this.inputForm = this.formBuilder.group({
        });
    }

    onSubmit(isValid: boolean) {
        if (isValid) {
            this.dialogRef.close(this.inputForm.value);
        }
    }
}
