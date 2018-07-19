import { Component, OnInit, Inject, OnChanges, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Department } from '../../shared/models/admin/department.model';
import { DepartmentService } from '../../core/department/department.service';
import { trigger, transition, style, animate, state } from '@angular/animations';


@Component({
    selector: 'erste-department-editor',
    templateUrl: './department-editor.component.html',
    styleUrls: ['./department-editor.component.scss'],
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
export class DepartmentEditorComponent implements OnInit, OnChanges {

    inputForm: FormGroup;
    @Input() department: Department;
    @Input() isNew: Boolean;
    @Output() refresh = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        private dataService: DepartmentService,
        private renderer: Renderer2) { }

    ngOnChanges() {
        if (this.department) {
            this.createEditForm(this.department);
        } else {
            this.createForm();
        }
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
            departmentId: [0, []],
            departmentName: ['', [Validators.required]],
            departmentHod: ['', [Validators.required]],
            departmentHodEmail: ['', [Validators.required]],
            active: [true],
            dateFrom: [Date.now()],
            dateUntil: [null],
            fipUser: ['test'],
            fipProg: ['Web'],
            fipTst: [Date.now()]
        });
    }

    createEditForm(department: Department): void {
        this.inputForm = this.formBuilder.group({
            departmentId: [department.departmentId, []],
            departmentName: [department.departmentName, [Validators.required]],
            departmentHod: [department.departmentHod, [Validators.required]],
            departmentHodEmail: [department.departmentHodEmail, [Validators.required]],
            active: [true],
            dateFrom: [department.dateFrom],
            dateUntil: [department.dateUntil],
            fipUser: [department.fipUser],
            fipProg: [department.fipProg],
            fipTst: [department.fipTst]
        });
    }

    onSubmit(isValid: boolean) {
        if (isValid) {
            if (this.department) {
                this.editDepartment();
            } else {
                this.createDepartment(this.inputForm.value);
            }
        }
    }

    onDelete() {
        this.deleteDepartment(this.department._id);
    }

    editDepartment() {
        const oldResource = <Department>this.department
        const newResource = <Department>this.inputForm.value;
        if (this.checkDefined(oldResource) && this.checkDefined(newResource)) {
            oldResource.dateUntil = new Date();
            oldResource.active = false;
            this.updateDepartment(oldResource);
            this.createDepartment(newResource);
        }
    }

    updateDepartment(department: Department): void {
        this.dataService.updateDepartment(department).subscribe(res => {
            console.log(res);
            this.emitRefresh()
        });
    }

    createDepartment(department: Department): void {
        this.dataService.createDepartment(department).subscribe(res => {
            console.log(res);
            this.emitRefresh()
        });
    }

    deleteDepartment(id): void {
        console.log(id);
        this.dataService.deleteDepartment(id).subscribe(res => {
            this.emitRefresh()
        });
    }

    emitRefresh() {
        this.refresh.emit('');
    }

    checkDefined(department: Department): boolean {
        if (department != null && department !== undefined) {
            return true;
        }
        return false;
    }
}
