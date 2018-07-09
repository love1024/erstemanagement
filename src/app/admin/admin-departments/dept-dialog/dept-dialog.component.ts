import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Department } from '../../../shared/models/admin/department.model';


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
        @Inject(MAT_DIALOG_DATA) public department: Department) { }

    ngOnInit() {
        if (this.department !== null) {
            this.createEditForm(this.department);
        } else {
            this.createForm();
        }
    }

    createForm(): void {
        this.inputForm = this.formBuilder.group({
            departmentId: [0, []],
            departmentName: ['', [Validators.required]],
            departmentHod: ['', [Validators.required]],
            departmentHodEmail: ['', [Validators.required]],
            dateFrom: [Date.now()],
            dateUntil: [null],
            fipUser: ['test'],
            fipProg: ['Web'],
            fipTst: [Date.now()]
        });
    }

    createEditForm(department: Department): void {
        this.inputForm = this.formBuilder.group({
            departmentId: [department.departmentId, []],
            departmentName: [department.departmentName, [Validators.required]],
            departmentHod: [department.departmentHod, [Validators.required]],
            departmentHodEmail: [department.departmentHodEmail, [Validators.required]],
            dateFrom: [department.dateFrom],
            dateUntil: [department.dateUntil],
            fipUser: [department.fipUser],
            fipProg: [department.fipProg],
            fipTst: [department.fipTst]
        });
    }

    onSubmit(isValid: boolean) {
        if (isValid) {
            this.dialogRef.close(this.inputForm.value);
        }
    }

}
