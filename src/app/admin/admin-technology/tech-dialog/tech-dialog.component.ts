import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Technology } from '../../../shared/models/admin/technology.model';

@Component({
    selector: 'erste-tech-dialog',
    templateUrl: './tech-dialog.component.html',
    styleUrls: ['./tech-dialog.component.scss']
})
export class TechDialogComponent implements OnInit {
    inputForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<TechDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public technology: Technology) { }

    ngOnInit() {
        if (this.technology !== null) {
            this.createEditForm(this.technology);
        } else {
            this.createForm();
        }
    }

    createForm(): void {
        this.inputForm = this.formBuilder.group({
            technologyId: [0, []],
            technologyName: ['', [Validators.required]],
            resLevelMsaName: ['', [Validators.required]],
            dateFrom: [Date.now()],
            dateUntil: [null],
            fipUser: ['test'],
            fipProg: ['Web'],
            fipTst: [Date.now()]
        });
    }

    createEditForm(technology: Technology): void {
        this.inputForm = this.formBuilder.group({
            technologyId: [technology.technologyId, []],
            technologyName: [technology.technologyName, [Validators.required]],
            resLevelMsaName: [technology.resLevelMsaName, [Validators.required]],
            dateFrom: [technology.dateFrom],
            dateUntil: [technology.dateUntil],
            fipUser: [technology.fipUser],
            fipProg: [technology.fipProg],
            fipTst: [technology.fipTst]
        });
    }

    onSubmit(isValid: boolean) {
        if (isValid) {
            this.dialogRef.close(this.inputForm.value);
        }
    }

}
