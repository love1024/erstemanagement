import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Resource } from '../../../shared/models/admin/resource.model';

@Component({
    selector: 'erste-resource-dialog',
    templateUrl: './resource-dialog.component.html',
    styleUrls: ['./resource-dialog.component.scss']
})
export class ResourceDialogComponent implements OnInit {

    inputForm: FormGroup;
    levels = [{ id: 1, name: 'L1' }, { id: 2, name: 'L2' }];

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ResourceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public resource: Resource) { }

    ngOnInit() {
        if (this.resource !== null) {
            this.createEditForm(this.resource);
        } else {
            this.createForm();
        }
    }

    onNoClick(): void {
        this.dialogRef.close(null);
    }

    createForm(): void {
        this.inputForm = this.formBuilder.group({
            resourceId: [, [Validators.required]],
            resourceName: ['', [Validators.required]],
            resourceEmail: ['', [Validators.required]],
            resourceErsteJoiningDate: ['', [Validators.required]],
            resourceCertifications: ['', [Validators.required]],
            resourceLevelId: ['', [Validators.required]],
            active: [true],
            dateFrom: [Date.now()],
            dateUntil: [null],
            fipUser: ['test'],
            fipProg: ['Web'],
            fipTst: [Date.now()]
        });
    }

    createEditForm(resource: Resource): void {
        this.inputForm = this.formBuilder.group({
            resourceId: [resource.resourceId, [Validators.required]],
            resourceName: [resource.resourceName, [Validators.required]],
            resourceEmail: [resource.resourceEmail, [Validators.required]],
            resourceErsteJoiningDate: [resource.resourceErsteJoiningDate, [Validators.required]],
            resourceCertifications: [resource.resourceCertifications, [Validators.required]],
            resourceLevelId: [resource.resourceLevelId, [Validators.required]],
            active: [true],
            dateFrom: [resource.dateFrom],
            dateUntil: [resource.dateUntil],
            fipUser: [resource.fipUser],
            fipProg: [resource.fipProg],
            fipTst: [resource.fiptst]
        });
    }

    onSubmit(isValid: boolean) {
        if (isValid) {
            this.dialogRef.close(this.inputForm.value);
        }
    }

    onClose() {
        this.dialogRef.close();
    }
}
