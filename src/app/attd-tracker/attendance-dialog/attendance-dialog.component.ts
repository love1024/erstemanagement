import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'erste-attendance-dialog',
    templateUrl: './attendance-dialog.component.html',
    styleUrls: ['./attendance-dialog.component.scss']
})
export class AttendanceDialogComponent implements OnInit {

    inputForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<AttendanceDialogComponent>,
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
            attendanceId: [0, [Validators.required]],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
            attendanceType: ['', [Validators.required]],
            approvalDate: ['', []],
            leaveType: ['', [Validators.required]],
            reason: ['', []],
            clientApprovalDate: ['', [Validators.required]],
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
