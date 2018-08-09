import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectResource } from '../../shared/models/project/projectResource.model';
import { ProjectResourceService } from '../../core/project/project-resource.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Technology } from '../../shared/models/admin/technology.model';
import { AdminTechDataService } from '../../admin/admin-technology/admin-tech-data.service';
import { Resource } from '../../shared/models/admin/resource.model';
import { ResourceService } from '../../core/resource/resource.service';
import { Project } from '../../shared/models/project/project.model';
import { ProjectService } from '../../core/project/project.service';
import { SnackbarService } from '../../core/snackbar/snackbar.service';
import { DataSource } from '@angular/cdk/table';
import { CompareService } from '../../core/compare/compare.service';

const paths = {
  project: "project",
  resource: "resource"
}

const projectCols = ['resourceId', 'resourceAllocation', 'technology', 'invoicingEntity', 'nonBillable', 'resourceIsBillable', 'keyResource', 'actions'];
const resourceCols = ['projectId', 'resourceAllocation', 'technology', 'invoicingEntity', 'nonBillable', 'resourceIsBillable', 'keyResource', 'actions'];

@Component({
  selector: 'erste-project-resource',
  templateUrl: './project-resource.component.html',
  styleUrls: ['./project-resource.component.scss'],
  animations: [
    trigger('smoothInOut', [
      state('in', style({ 'min-height': '30px', 'height': 'auto' })),
      transition('void => *', [
        style({ 'min-height': '0', 'height': '0' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ 'min-height': '0', 'height': '0' }))
      ])
    ])
  ]
})
export class ProjectResourceComponent implements OnInit {

  @Input() id: number;
  @Input() currentPath: String;
  displayedColumns: String[];
  dataSource = new MatTableDataSource();
  inputForm: FormGroup;
  data: ProjectResource[];
  technologies: Technology[];
  resources: Resource[];
  projects: Project[];
  header: String;
  isLoading = false;
  showSaving = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: ProjectResourceService,
    private technologyService: AdminTechDataService,
    private resourceService: ResourceService,
    private compareService: CompareService,
    private projectService: ProjectService,
    private snackbarService: SnackbarService,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.createForm([]);
    this.technologyService.getTechnologyList().subscribe((techs: Technology[]) => {
      this.technologies = techs;
    })
    this.resourceService.getResourceList(true).subscribe((resources: Resource[]) => {
      this.resources = resources;
    })
    this.projectService.getProjects(true).subscribe((projects: Project[]) => {
      this.projects = projects;
    })
  }

  ngOnChanges() {
    if (this.currentPath == paths.project) {
      this.displayedColumns = projectCols
      this.header = "PROJECT RESOURCES";
    }
    else {
      this.displayedColumns = resourceCols
      this.header = "ALLOCATED PROJECTS";
    }
    //Using timeout for smooth animations
    setTimeout(() => {
      this.refreshDataTable();
    }, 800)
  }

  refreshDataTable() {
    this.isLoading = true;
    this.dataSource = null;
    if (this.currentPath == paths.project) {
      this.createProjectForm();
    } else {
      this.createResourceForm();
    }
  }

  createProjectForm() {
    this.dataService.getResourcesByProjectId(true, this.id)
      .subscribe(
        list => {
          this.data = list;
          this.dataSource = new MatTableDataSource(list);
          this.createForm(list);
          this.isLoading = false;
        }
      );
  }

  createResourceForm() {
    this.dataService.getProjectsByResourceId(true, this.id)
      .subscribe(
        list => {
          this.data = list;
          this.dataSource = new MatTableDataSource(list);
          this.createForm(list);
          this.isLoading = false;
        }
      );
  }

  createForm(projectResources: ProjectResource[]): void {
    let formArr = new FormArray(projectResources.map(projectResource => this.createFormGroup(projectResource)));
    this.inputForm = this.formBuilder.group({
      formArray: formArr
    })
  }

  createFormGroup(projectResource) {
    return this.formBuilder.group({
      _id: [projectResource._id],
      projectResourceId: [projectResource.projectResourceId],
      projectId: [projectResource.projectId, [Validators.required]],
      resourceId: [projectResource.resourceId, [Validators.required]],
      technologyId: [projectResource.technologyId, [Validators.required]],
      billRateId: [projectResource.billRateId, [Validators.required]],
      resourceAllocation: [projectResource.resourceAllocation, [Validators.required]],
      keyResource: [projectResource.keyResource, [Validators.required]],
      invoicingEntity: [projectResource.invoicingEntity, [Validators.required]],
      nonBillable: [projectResource.nonBillable, [Validators.required]],
      resourceIsBillable: [projectResource.resourceIsBillable],
      active: [projectResource.active, Validators.required],
      dateFrom: [projectResource.dateFrom],
      dateUntil: [projectResource.dateUntil],
      fipUser: [projectResource.fipUser],
      fipProg: [projectResource.fipProg],
      fipTst: [projectResource.fipTst]
    })
  }

  createEmptyFormGroup() {
    return this.formBuilder.group({
      projectResourceId: [''],
      projectId: [(this.currentPath == paths.project ? this.id : ''), [Validators.required]],
      resourceId: [(this.currentPath == paths.resource ? this.id : ''), [Validators.required]],
      technologyId: ['', [Validators.required]],
      billRateId: [0, [Validators.required]],
      resourceAllocation: ['', [Validators.required]],
      keyResource: [false, [Validators.required]],
      invoicingEntity: ['', [Validators.required]],
      nonBillable: ['', [Validators.required]],
      resourceIsBillable: [false],
      active: [true, Validators.required],
      dateFrom: [new Date()],
      dateUntil: [null],
      fipUser: ['Test'],
      fipProg: ['Angular'],
      fipTst: [new Date()]
    })
  }

  onSubmit(idx: number) {

    let form = (this.inputForm.get("formArray") as FormArray).at(idx);
    if (!form.valid)
      return;
    //Creating new Resource
    if (form.value.projectResourceId == '') {
      this.createProjectResource(form.value);
    } else {
      const oldResource = <ProjectResource>this.data[idx];
      const newResource = <ProjectResource>form.value;
      let isEqual = this.compareService.isEqual(oldResource, newResource);
      if (isEqual) {
        this.snackbarService.open("Form is not changed");
        return;
      }
      if (this.checkDefined(oldResource) && this.checkDefined(newResource)) {
        oldResource.dateUntil = new Date();
        oldResource.active = false;
        this.updateProjectResource(oldResource);
        this.createProjectResource(newResource);
      }
    }
  }

  addNewRow() {
    let formArr = this.inputForm.get("formArray") as FormArray;
    let newGroup = this.createEmptyFormGroup();
    this.data.push(newGroup.value);
    this.dataSource = new MatTableDataSource(this.data);
    formArr.push(newGroup);
  }

  onDelete(idx: number) {
    let form = (this.inputForm.get("formArray") as FormArray);
    let group = form.at(idx);
    form.removeAt(idx);
    this.data.splice(idx, 1);
    this.dataSource = new MatTableDataSource(this.data);
    if (group.value._id) {
      this.dataService.deleteProjectResource(group.value._id).subscribe(() => {
        this.snackbarService.open("Deleted Succesfully");
      })
    }
  }

  updateProjectResource(projectResource: ProjectResource): void {
    this.dataService.updateProjectResource(projectResource).subscribe(res => {
      this.snackbarService.open("Updated Succesfully");
    });
  }

  createProjectResource(projectResource: ProjectResource): void {
    delete projectResource["_id"];
    this.dataService.createProjectResource(projectResource).subscribe(res => {
      this.snackbarService.open("Saved Succesfully");
      projectResource._id = res._id;
    });
  }

  checkDefined(projectResource: ProjectResource): boolean {
    if (projectResource != null && projectResource !== undefined) {
      return true;
    }
    return false;
  }
}
