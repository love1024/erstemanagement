import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'erste-dept-dialog',
    templateUrl: './dept-dialog.component.html',
    styleUrls: ['./dept-dialog.component.scss']
})
export class DeptDialogComponent implements OnInit {

    inputForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DeptDialogComponent>,
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
            departmentId: [0, []],
            departmentName: ['', [Validators.required]],
            departmentHod: ['', [Validators.required]],
            departmentHodEmail: ['', [Validators.required]]
        });
    }

    createEditForm(project): void {
        this.inputForm = this.formBuilder.group({
            departmentId: [0, []],
            departmentName: ['', [Validators.required]],
            departmentHod: ['', [Validators.required]],
            departmentHodEmail: ['', [Validators.required]]
        });
    }

    onSubmit(isValid: boolean) {
        if (isValid) {
            this.dialogRef.close(this.inputForm.value);
        }
    }

}
