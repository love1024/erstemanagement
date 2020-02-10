import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SnackbarService } from '../../core/snackbar/snackbar.service';
import { DataSource } from '@angular/cdk/table';
import { CompareService } from '../../core/compare/compare.service';
import { UserService } from 'src/app/core/user/user.service';
import { IAccessDto, IUserAccessDto } from 'src/app/shared/models/access/access';

const paths = {
  project: "project",
  resource: "resource",
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
}

const accessCols = ['service', 'create', 'delete', 'edit', 'view'];

@Component({
  selector: 'erste-resource-access',
  templateUrl: './resource-access.component.html',
  styleUrls: ['./resource-access.component.scss']
})
export class ResourceAccessComponent implements OnInit {

  @Input() userId: number;
  displayedColumns: String[];
  dataSource = new MatTableDataSource();
  inputForm: FormGroup;
  data: IAccessDto;
  isLoading = false;
  showSaving = false;

  constructor(
    private formBuilder: FormBuilder,
    private compareService: CompareService,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges() {
    this.displayedColumns = accessCols
    //Using timeout for smooth animations
    setTimeout(() => {
      this.refreshDataTable();
    }, 800)
  }

  refreshDataTable() {
    this.isLoading = true;
    this.dataSource = null;
    this.createAccessForm();
  }

  createAccessForm() {
    this.userService.getUserAllAccess(this.userId)
      .subscribe(
        list => {
          this.data = list;
          this.dataSource = new MatTableDataSource([this.data.userAccess]);
          this.createForm(list);
          this.isLoading = false;
        }
      );
  }

  createForm(access?: IAccessDto): void {
    let accessFormArr;
    if(access) {
      let userAccessForm = this.createFormGroup(access.userAccess);
      accessFormArr = new FormArray([userAccessForm]);
    } else {
      accessFormArr = new FormArray([]);
    }

    this.inputForm = this.formBuilder.group({
      formArray: accessFormArr
    })
  }

  createFormGroup(access: IUserAccessDto) {
    return this.formBuilder.group({
      name: [access.name],
      userId: [access.userId],
      create: [access.create],
      delete: [access.delete],
      view: [access.view],
      edit: [access.edit]
    })
  }

  createEmptyFormGroup() {
    return this.formBuilder.group({
      create: [''],
      delete: [''],
      edit: [''],
      view: ['']
    })
  }

  onSubmit() {

    let form = (this.inputForm.get("formArray") as FormArray).value;
    
    let access: IAccessDto = {
      userAccess: {
        userId: form[0].userId,
        name: form[0].name,
        create: form[0].create,
        edit: form[0].edit,
        view: form[0].view,
        delete: form[0].delete
      }
    }

    this.userService.updateUserAccess(access).subscribe(() => {
      this.snackbarService.open("Updated Succesfully");
    })   
  }
}
