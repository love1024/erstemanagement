import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Resource } from '../../shared/models/admin/resource.model';
import { Attendance } from '../../shared/models/attendance/attendance.model';
import { ResourcesDataService } from '../../resource/resources/resources-data.service';

@Component({
    selector: 'erste-attendance-dialog',
    templateUrl: './attendance-dialog.component.html',
    styleUrls: ['./attendance-dialog.component.scss']
})
export class AttendanceDialogComponent implements OnInit {

    inputForm: FormGroup;
    resources: Resource[];

    constructor(
        private formBuilder: FormBuilder,
        private resourceService: ResourcesDataService,
        public dialogRef: MatDialogRef<AttendanceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public attendance: Attendance) { }

    ngOnInit() {
        if (this.attendance !== null) {
            this.createEditForm(this.attendance);
        } else {
            this.createForm();
        }
        this.resourceService.getResourceList(true).subscribe((resources: Resource[]) => {
            this.resources = resources;
        });
    }

    onNoClick(): void {
        this.dialogRef.close(null);
    }

    createForm(): void {
        this.inputForm = this.formBuilder.group({
            attendanceId: [0, [Validators.required]],
            resourceId: [, [Validators.required]],
            approvalDate: ['', [Validators.required]],
            taskId: ['', [Validators.required]],
            date: ['', [Validators.required]],
            hours: ['', [Validators.required]],
            remarks: ['', [Validators.required]],
            fipUser: ['test'],
            fipProg: ['Web'],
            fipTst: [Date.now()],
            attendanceType: [''],
            presentType: [''],
            leaveType: [''],
            holidayType: [''],
            wfh: [false],
            clientApprovalDate: ['']
        });
    }

    createEditForm(attendance: Attendance): void {
        this.inputForm = this.formBuilder.group({
            attendanceId: [attendance.attendanceId, [Validators.required]],
            resourceId: [attendance.resourceId, []],
            approvalDate: [attendance.approvalDate, [Validators.required]],
            taskId: [attendance.taskId, [Validators.required]],
            date: [attendance.date, [Validators.required]],
            hours: [attendance.hours + '', [Validators.required]],
            remarks: [attendance.remarks, [Validators.required]],
            attendanceType: [attendance.attendanceType],
            presentType: [attendance.presentType],
            leaveType: [attendance.leaveType],
            holidayType: [attendance.holidayType],
            wfh: [attendance.wfh],
            clientApprovalDate: [attendance.clientApprovalDate],
            fipUser: [attendance.fipUser],
            fipProg: [attendance.fipProg],
            fipTst: [Date.now()]
        });
    }

    onSubmit(isValid: boolean) {
        if (isValid) {
            this.dialogRef.close(this.inputForm.value);
        }
    }
}
