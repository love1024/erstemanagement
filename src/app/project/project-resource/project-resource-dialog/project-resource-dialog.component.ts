import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectResource } from '../../../shared/models/project/projectResource.model';
import { Resource } from '../../../shared/models/admin/resource.model';
import { AdminResourcesDataService } from '../../../admin/admin-resources/admin-resources-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'erste-project-resource-dialog',
  templateUrl: './project-resource-dialog.component.html',
  styleUrls: ['./project-resource-dialog.component.scss']
})
export class ProjectResourceDialogComponent implements OnInit {

  inputForm: FormGroup;
  resources: Resource[];
  projectId: Number;

  constructor(
    private formBuilder: FormBuilder,
    private resourceSerice: AdminResourcesDataService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<ProjectResourceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.projectId = this.data.projectId;

    if (this.data.projectResource) {
      this.createEditForm(this.data.projectResource);
    } else {
      this.createForm();
    }
    this.resourceSerice.getResourceList(true).subscribe((resources: Resource[]) => {
      this.resources = resources;
    })
  }

  createForm(): void {
    this.inputForm = this.formBuilder.group({
      projectResourceId: [''],
      projectId: [this.projectId, [Validators.required]],
      resourceId: ['', [Validators.required]],
      billRateId: ['', [Validators.required]],
      resourceAllocation: ['', [Validators.required]],
      resourceIsBillable: [false],
      active: [true, Validators.required],
      dateFrom: [Date.now()],
      dateUntil: [null],
      fipUser: ['test'],
      fipProg: ['Web'],
      fipTst: [Date.now()]
    });
  }

  createEditForm(projectResource: ProjectResource): void {
    this.inputForm = this.formBuilder.group({
      projectResourceId: [projectResource.projectResourceId],
      projectId: [projectResource.projectId, [Validators.required]],
      resourceId: [projectResource.resourceId, [Validators.required]],
      billRateId: [projectResource.billRateId, [Validators.required]],
      resourceAllocation: [projectResource.resourceAllocation, [Validators.required]],
      resourceIsBillable: [projectResource.resourceIsBillable],
      active: [projectResource.active, Validators.required],
      dateFrom: [projectResource.dateFrom],
      dateUntil: [projectResource.dateUntil],
      fipUser: [projectResource.fipUser],
      fipProg: [projectResource.fipProg],
      fipTst: [projectResource.fipTst]
    });
  }

  onSubmit(isValid: boolean) {
    console.log(isValid);
    if (isValid) {
      const data = { old: this.data.projectResource, new: this.inputForm.value };
      this.dialogRef.close(data);
    }
  }
}
