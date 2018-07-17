import { Component, OnInit, Inject, Input, Output, EventEmitter, Renderer2, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectResource } from '../../shared/models/project/projectResource.model';
import { Resource } from '../../shared/models/admin/resource.model';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../core/resource/resource.service';
import { ProjectResourceService } from '../../core/project/project-resource.service';

@Component({
  selector: 'erste-project-resource-editor',
  templateUrl: './project-resource-editor.component.html',
  styleUrls: ['./project-resource-editor.component.scss']
})
export class ProjectResourceEditorComponent implements OnInit, OnChanges {

  @Input() projectResource: ProjectResource;
  @Input() isNew: Boolean;
  @Input() projectId: Number;
  @Output() refresh = new EventEmitter();
  inputForm: FormGroup;
  resources: Resource[];

  constructor(
    private formBuilder: FormBuilder,
    private resourceSerice: ResourceService,
    private dataService: ProjectResourceService,
    private renderer: Renderer2,
    private route: ActivatedRoute) { }

  ngOnChanges() {
    if (this.projectResource) {
      this.createEditForm(this.projectResource);
    } else {
      this.createForm();
    }
    this.resourceSerice.getResourceList(true).subscribe((resources: Resource[]) => {
      this.resources = resources;
    })
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
    if (isValid) {
      if (this.projectResource) {
        this.editProjectResource();
      } else {
        this.createProjectResource(this.inputForm.value);
      }
    }
  }

  onDelete() {
    this.deleteProjectResource(this.projectResource._id);
  }

  editProjectResource() {
    const oldResource = <ProjectResource>this.projectResource
    const newResource = <ProjectResource>this.inputForm.value;
    if (this.checkDefined(oldResource) && this.checkDefined(newResource)) {
      oldResource.dateUntil = new Date();
      oldResource.active = false;
      this.updateProjectResource(oldResource);
      this.createProjectResource(newResource);
    }
  }

  updateProjectResource(projectResource: ProjectResource): void {
    this.dataService.updateProjectResource(projectResource).subscribe(res => {
      console.log(res);
      this.emitRefresh()
    });
  }

  createProjectResource(projectResource: ProjectResource): void {
    this.dataService.createProjectResource(projectResource).subscribe(res => {
      console.log(res);
      this.emitRefresh()
    });
  }

  deleteProjectResource(id): void {
    console.log(id);
    this.dataService.deleteProjectResource(id).subscribe(res => {
      this.emitRefresh()
    });
  }

  emitRefresh() {
    this.refresh.emit('');
  }

  checkDefined(projectResource: ProjectResource): boolean {
    if (projectResource != null && projectResource !== undefined) {
      return true;
    }
    return false;
  }
}
