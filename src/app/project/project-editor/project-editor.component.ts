import { Component, OnInit, Inject, OnChanges, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../shared/models/project/project.model';
import { Department } from '../../shared/models/admin/department.model';
import { Technology } from '../../shared/models/admin/technology.model';
import { AdminTechDataService } from '../../admin/admin-technology/admin-tech-data.service';
import { ProjectService } from '../../core/project/project.service';
import { DepartmentService } from '../../core/department/department.service';

@Component({
    selector: 'erste-project-editor',
    templateUrl: './project-editor.component.html',
    styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit, OnChanges {

    @Input() project: Project;
    @Input() isNew: Boolean;
    @Output() refresh = new EventEmitter();

    inputForm: FormGroup;
    departments: Department[];
    technologies: Technology[]

    constructor(private formBuilder: FormBuilder,
        private departmentService: DepartmentService,
        private renderer: Renderer2,
        private technologyService: AdminTechDataService,
        private dataService: ProjectService) { }

    ngOnChanges() {
        if (this.project) {
            this.createEditForm(this.project);
        } else {
            this.createForm();
        }
        this.departmentService.getDepartmentList(true).subscribe((departments: Department[]) => {
            console.log(departments);
            this.departments = departments;
        });
        this.technologyService.getTechnologyList().subscribe((technologies: Technology[]) => {
            console.log(technologies);
            this.technologies = technologies;
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
            projectId: [''],
            projectNameAsPerSow: ['', [Validators.required]],
            departmentId: ['', [Validators.required]],
            technologyId: [[], [Validators.required]],
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
            if (this.project) {
                this.editProject();
            } else {
                this.createProject(this.inputForm.value);
            }
        }
    }

    onDelete() {
        this.deleteProject(this.project._id);
    }

    editProject() {
        const oldResource = <Project>this.project
        const newResource = <Project>this.inputForm.value;
        if (this.checkDefined(oldResource) && this.checkDefined(newResource)) {
            oldResource.dateUntil = new Date();
            oldResource.active = false;
            this.updateProject(oldResource);
            this.createProject(newResource);
        }
    }

    updateProject(project: Project): void {
        this.dataService.updateProject(project).subscribe(res => {
            console.log(res);
            this.emitRefresh()
        });
    }

    createProject(project: Project): void {
        this.dataService.createProject(project).subscribe(res => {
            console.log(res);
            this.emitRefresh()
        });
    }

    deleteProject(id): void {
        console.log(id);
        this.dataService.deleteProject(id).subscribe(res => {
            this.emitRefresh()
        });
    }

    emitRefresh() {
        this.refresh.emit('');
    }

    checkDefined(project: Project): boolean {
        if (project != null && project !== undefined) {
            return true;
        }
        return false;
    }
}
