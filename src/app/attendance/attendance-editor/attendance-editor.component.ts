import { Component, OnInit, Inject, OnChanges, Input, Output, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Attendance } from '../../shared/models/attendance/attendance.model';
import { AttendanceService } from '../../core/attendance/attendance.service';
import { Resource } from '../../shared/models/admin/resource.model';
import { ResourceService } from '../../core/resource/resource.service';
import { CompareService } from '../../core/compare/compare.service';
import { SnackbarService } from '../../core/snackbar/snackbar.service';

@Component({
    selector: 'erste-attendance-editor',
    templateUrl: './attendance-editor.component.html',
    styleUrls: ['./attendance-editor.component.scss']
})
export class AttendanceEditorComponent implements OnInit, OnChanges {

    @Input() attendance: Attendance;
    @Input() isNew: Boolean;
    @Output() refresh = new EventEmitter();

    inputForm: FormGroup;
    resources: Resource[];

    constructor(
        private formBuilder: FormBuilder,
        private dataService: AttendanceService,
        private resourceService: ResourceService,
        private compareService: CompareService,
        private snackbarService: SnackbarService,
        private renderer: Renderer2) { }

    ngOnChanges() {
        console.log(!this.attendance);
        if (this.attendance) {
            this.createEditForm(this.attendance);
        } else {
            this.createForm();
        }
        this.resourceService.getResourceList(true).subscribe((resources: Resource[]) => {
            this.resources = resources;
        });
        if (this.isNew) {
            let container = document.getElementById('form-container');
            this.renderer.setStyle(container, 'margin-bottom', '50px');
            this.renderer.setStyle(container, 'border', '1px solid lightgrey')
            this.renderer.setStyle(container, 'box-shadow', 'none')
        }
    }

    ngOnInit() { }

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
            fipTst: [attendance.fipTst]
        });
    }

    onSubmit(isValid: boolean) {
        if (isValid) {
            if (this.attendance) {
                this.editAttendance();
            } else {
                this.createAttendance(this.inputForm.value);
            }
        }
    }

    onDelete() {
        this.deleteAttendance(this.attendance.attendanceId);
    }

    editAttendance() {
        const isEqual = this.compareService.isEqual(this.inputForm.value, this.attendance);
        if (isEqual) {
            this.snackbarService.open("Form is not changed");
            return;
        }
        // if (this.checkDefined(this.inputForm.value)) {
        //     this.updateAttendance(this.inputForm.value);
        // }
    }

    updateAttendance(attendance: Attendance): void {
        this.dataService.updateAttendance(attendance).subscribe(res => {
            console.log(res);
            this.emitRefresh()
        });
    }

    createAttendance(attendance: Attendance): void {
        this.dataService.createAttendance(attendance).subscribe(res => {
            console.log(res);
            this.emitRefresh()
        });
    }

    deleteAttendance(id): void {
        console.log(id);
        this.dataService.deleteAttendance(id).subscribe(res => {
            this.emitRefresh()
        });
    }

    emitRefresh() {
        this.refresh.emit('');
    }

    checkDefined(attendance: Attendance): boolean {
        if (attendance != null && attendance !== undefined) {
            return true;
        }
        return false;
    }
}
