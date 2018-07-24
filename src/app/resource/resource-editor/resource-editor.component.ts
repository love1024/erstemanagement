import { Component, OnInit, Inject, OnChanges, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resource } from '../../shared/models/admin/resource.model';
import { Level } from '../../shared/models/admin/level.model';
import { AdminLevelinfoDataService } from '../../admin/level-info/admin-levelinfo-data.service';
import { ResourceService } from '../../core/resource/resource.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { SnackbarService } from '../../core/snackbar/snackbar.service';
import { CompareService } from '../../core/compare/compare.service';


@Component({
    selector: 'erste-resource-editor',
    templateUrl: './resource-editor.component.html',
    styleUrls: ['./resource-editor.component.scss'],
    animations: [
        trigger('smoothInOut', [
            state('in', style({ 'height': 'auto' })),
            transition('void => *', [
                style({ 'height': '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(225, style({ 'height': '0' }))
            ])
        ])
    ]
})
export class ResourceEditorComponent implements OnInit, OnChanges {

    inputForm: FormGroup;
    levels: Level[];

    @Input() resource: Resource;
    @Input() isNew: Boolean;
    @Input() expanded: Boolean;
    @Output() refresh = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private dataService: ResourceService,
        private levelService: AdminLevelinfoDataService,
        private compareService: CompareService,
        private snackbarService: SnackbarService,
        private renderer: Renderer2) { }


    ngOnChanges() {
        if (this.resource) {
            this.createEditForm(this.resource);
        } else {
            this.createForm();
        }
        this.levelService.getLevelsList().subscribe((levels: Level[]) => {
            this.levels = levels;
        })
        if (this.isNew) {
            let container = document.getElementById('form-container');
            this.renderer.setStyle(container, 'margin-bottom', '50px');
            this.renderer.setStyle(container, 'border', '1px solid lightgrey')
            this.renderer.setStyle(container, 'box-shadow', 'none')
        }
    }

    ngOnInit() {
    }

    createForm(): void {
        this.inputForm = this.formBuilder.group({
            resourceId: [, [Validators.required]],
            resourceName: ['', [Validators.required]],
            resourceEmail: ['', [Validators.required]],
            resourceErsteJoiningDate: [new Date(), [Validators.required]],
            resourceCertifications: ['', []],
            startDate: [new Date(), [Validators.required]],
            endDate: [new Date(), [Validators.required]],
            resourceLevelId: ['', [Validators.required]],
            location: ['', [Validators.required]],
            citrix: [false, [Validators.required]],
            active: [true],
            dateFrom: [Date.now()],
            dateUntil: [null],
            fipUser: ['test'],
            fipProg: ['Web'],
            fipTst: [Date.now()]
        });
    }

    createEditForm(resource: Resource): void {
        this.inputForm = this.formBuilder.group({
            resourceId: [resource.resourceId, [Validators.required]],
            resourceName: [resource.resourceName, [Validators.required]],
            resourceEmail: [resource.resourceEmail, [Validators.required]],
            resourceErsteJoiningDate: [resource.resourceErsteJoiningDate, [Validators.required]],
            resourceCertifications: [resource.resourceCertifications, [Validators.required]],
            startDate: [resource.startDate, [Validators.required]],
            endDate: [resource.endDate, [Validators.required]],
            resourceLevelId: [resource.resourceLevelId, [Validators.required]],
            location: [resource.location, [Validators.required]],
            citrix: [resource.citrix, [Validators.required]],
            active: [true],
            dateFrom: [resource.dateFrom],
            dateUntil: [resource.dateUntil],
            fipUser: [resource.fipUser],
            fipProg: [resource.fipProg],
            fipTst: [resource.fiptst]
        });
    }

    onSubmit(isValid: boolean) {
        if (isValid) {
            if (this.resource) {
                this.editResource();
            } else {
                this.createResource(this.inputForm.value);
            }
        }
    }

    onDelete() {
        this.deleteResource(this.resource._id);
    }

    editResource() {
        const oldResource = <Resource>this.resource
        const newResource = <Resource>this.inputForm.value;
        let isEqual = this.compareService.isEqual(oldResource, newResource);
        if (isEqual) {
            this.snackbarService.open("Form is not changed");
            return;
        }
        if (this.checkDefined(oldResource) && this.checkDefined(newResource)) {
            oldResource.dateUntil = new Date();
            oldResource.active = false;
            this.updateResource(oldResource);
            this.createResource(newResource);
        }
    }

    updateResource(resource: Resource): void {
        this.dataService.updateResource(resource).subscribe(res => {
            console.log(res);
            this.emitRefresh()
        });
    }

    createResource(resource: Resource): void {
        this.dataService.createResource(resource).subscribe(res => {
            console.log(res);
            this.emitRefresh()
        });
    }

    deleteResource(id): void {
        console.log(id);
        this.dataService.deleteResource(id).subscribe(res => {
            this.emitRefresh()
        });
    }

    emitRefresh() {
        this.refresh.emit('');
    }

    checkDefined(resource: Resource): boolean {
        if (resource != null && resource !== undefined) {
            return true;
        }
        return false;
    }
}
