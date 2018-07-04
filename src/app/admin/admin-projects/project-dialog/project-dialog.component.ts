import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Project } from '../../../shared/models/admin/project.model';

@Component({
    selector: 'erste-project-dialog',
    templateUrl: './project-dialog.component.html',
    styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {

    inputForm: FormGroup;
    departments = [{ id: 1, name: 'dept1' }, { id: 2, name: 'dept2' }];
    technologies = [{ id: 1, name: 'Java' }, { id: 2, name: 'Angular' }];

    constructor(private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ProjectDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public project: Project) { }

    ngOnInit() {
        if (this.project !== null) {
            this.createEditForm(this.project);
        } else {
            this.createForm();
        }
    }

    onNoClick(): void {
        this.dialogRef.close(null);
    }

    createForm(): void {
        this.inputForm = this.formBuilder.group({
            projectNameAsPerSow: ['', [Validators.required]],
            departmentId: ['', [Validators.required]],
            technologyId: ['', [Validators.required]],
            projectModelName: ['', [Validators.required]],
            projectSitTAM: ['', [Validators.required]],
            projectSitTAMEmail: ['', [Validators.required]],
            projectSitProjectManager: ['', [Validators.required]],
            projectSitProjectManagerEmail: ['', [Validators.required]],
            projectNagarroTAMId: ['', [Validators.required]],
            projectNagarroPMId: ['', [Validators.required]],
            projectStartDate: ['', [Validators.required]],
            projectEndDate: ['', [Validators.required]],
            projectCostCenter: ['', [Validators.required]],
            projectPONumber: ['', [Validators.required]],
            dateFrom: [Date.now()],
            dateUntil: [null],
            fipUser: ['test'],
            fipProg: ['Web'],
            fipTst: [Date.now()]
        });
    }

    createEditForm(project: Project): void {
        this.inputForm = this.formBuilder.group({
            projectNameAsPerSow: [project.projectNameAsPerSow, [Validators.required]],
            departmentId: [project.departmentId, [Validators.required]],
            technologyId: [project.technologyId, [Validators.required]],
            projectModelName: [project.projectModelName, [Validators.required]],
            projectSitTAM: [project.projectSitTAM, [Validators.required]],
            projectSitTAMEmail: [project.projectSitTAMEmail, [Validators.required]],
            projectSitProjectManager: [project.projectSitProjectManager, [Validators.required]],
            projectSitProjectManagerEmail: [project.projectSitProjectManagerEmail, [Validators.required]],
            projectNagarroTAMId: [project.projectNagarroTAMId, [Validators.required]],
            projectNagarroPMId: [project.projectNagarroPMId, [Validators.required]],
            projectStartDate: [project.projectStartDate, [Validators.required]],
            projectEndDate: [project.projectEndDate, [Validators.required]],
            projectCostCenter: [project.projectCostCenter, [Validators.required]],
            projectPONumber: [project.projectPONumber, [Validators.required]],
            dateFrom: [Date.now()],
            dateUntil: [null],
            fipUser: ['test'],
            fipProg: ['Web'],
            fipTst: [Date.now()]
        });
    }

    onSubmit(isValid: boolean) {
        if (isValid) {
            this.dialogRef.close(this.inputForm.value);
        }
    }
}
