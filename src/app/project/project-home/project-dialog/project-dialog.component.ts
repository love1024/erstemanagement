import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Project } from '../../../shared/models/project/project.model';
import { Department } from '../../../shared/models/admin/department.model';
import { AdminDeptDataService } from 'src/app/admin/admin-departments/admin-dept-data.service';

@Component({
    selector: 'erste-project-dialog',
    templateUrl: './project-dialog.component.html',
    styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {

    inputForm: FormGroup;
    departments: Department[];
    technologies = [{ id: 1, name: 'Java' }, { id: 2, name: 'Angular' }];

    constructor(private formBuilder: FormBuilder,
        private departmentService: AdminDeptDataService,
        public dialogRef: MatDialogRef<ProjectDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public project: Project) { }

    ngOnInit() {
        if (this.project !== null) {
            this.createEditForm(this.project);
        } else {
            this.createForm();
        }
        this.departmentService.getDepartmentList().subscribe((departments: Department[]) => {
            console.log(departments);
            this.departments = departments;
        });
    }

    createForm(): void {
        this.inputForm = this.formBuilder.group({
            projectId: [''],
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
            active: [true, Validators.required],
            dateFrom: [Date.now()],
            dateUntil: [null],
            fipUser: ['test'],
            fipProg: ['Web'],
            fipTst: [Date.now()]
        });
    }

    createEditForm(project: Project): void {
        this.inputForm = this.formBuilder.group({
            projectId: [project.projectId],
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
            active: [project.active, Validators.required],
            dateFrom: [project.dateFrom],
            dateUntil: [project.dateUntil],
            fipUser: [project.fipUser],
            fipProg: [project.fipProg],
            fipTst: [Date.now()]
        });
    }

    onSubmit(isValid: boolean) {
        if (isValid) {
            const data = { old: this.project, new: this.inputForm.value };
            this.dialogRef.close(data);
        }
    }
}
