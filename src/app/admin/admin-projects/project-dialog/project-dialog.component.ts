import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'erste-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {

    inputForm: FormGroup;
    departments = [{ id: 1, name: 'dept1' }, { id: 2, name: 'dept2' }];

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
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
            projectId: [0, []],
            projectNameAsPerSow: ['', [Validators.required]],
            departmentId: ['', [Validators.required]],
            projectTechnology: ['', [Validators.required]],
            projectModelName: ['', [Validators.required]],
            projectSitTam: ['', [Validators.required]],
            projectSitTamEmail: ['', [Validators.required]],
            projectSitProjectManager: ['', [Validators.required]],
            projectSitProjectManagerEmail: ['', [Validators.required]],
            projectStartDate: ['', [Validators.required]],
            resourceBillingId: ['', [Validators.required]],
            technologyName: ['', [Validators.required]],
            projectCostCenter: ['', [Validators.required]],
            projectPONumber: ['', [Validators.required]],
        });
    }

    createEditForm(project): void {
        this.inputForm = this.formBuilder.group({
            projectId: [0, []],
            projectNameAsPerSow: ['', [Validators.required]],
            departmentId: ['', [Validators.required]],
            projectTechnology: ['', [Validators.required]],
            projectModelName: ['', [Validators.required]],
            projectSitTam: ['', [Validators.required]],
            projectSitTamEmail: ['', [Validators.required]],
            projectSitProjectManager: ['', [Validators.required]],
            projectSitProjectManagerEmail: ['', [Validators.required]],
            projectStartDate: ['', [Validators.required]],
            resourceBillingId: ['', [Validators.required]],
            technologyName: ['', [Validators.required]],
            projectCostCenter: ['', [Validators.required]],
            projectPONumber: ['', [Validators.required]],
        });
    }

    onSubmit(isValid: boolean) {
        if (isValid) {
            this.dialogRef.close(this.inputForm.value);
        }
    }
}
