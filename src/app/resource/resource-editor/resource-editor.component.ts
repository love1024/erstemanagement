import {
  Component,
  OnInit,
  Inject,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  Renderer2
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Resource } from "../../shared/models/admin/resource.model";
import {
  trigger,
  transition,
  style,
  animate,
  state
} from "@angular/animations";
import { SnackbarService } from "../../core/snackbar/snackbar.service";
import { IUser } from "src/app/shared/models/user/user";
import { UserService } from "src/app/core/user/user.service";
import { LoginService } from "src/app/core/login/login.service";
import { IUserAccessDto } from "src/app/shared/models/access/access";

@Component({
  selector: "erste-resource-editor",
  templateUrl: "./resource-editor.component.html",
  styleUrls: ["./resource-editor.component.scss"],
  animations: [
    trigger("smoothInOut", [
      state("in", style({ height: "auto" })),
      transition("void => *", [style({ height: "0" }), animate(200)]),
      transition("* => void", [animate(225, style({ height: "0" }))])
    ])
  ]
})
export class ResourceEditorComponent implements OnInit, OnChanges {
  inputForm: FormGroup;

  @Input() user: IUser;
  @Input() isNew: Boolean;
  @Input() expanded: Boolean;
  @Output() refresh = new EventEmitter();

  super: IUser;

  userAccess: IUserAccessDto;

  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private userService: UserService,
    private loginService: LoginService,
    private renderer: Renderer2
  ) {
    this.super = this.loginService.getUser();
  }

  ngOnChanges() {
    if (this.user) {
      this.createEditForm(this.user);
    } else {
      this.createForm();
    }
    if (this.isNew) {
      let container = document.getElementById("form-container");
      this.renderer.setStyle(container, "margin-bottom", "50px");
      this.renderer.setStyle(container, "border", "1px solid lightgrey");
      this.renderer.setStyle(container, "box-shadow", "none");
    }
    this.userService.getUserAllAccess(this.super.userId).subscribe(access => {
      this.userAccess = access.userAccess;
      if (this.super.role != "Professor") {
        this.userAccess.create = this.userAccess.delete = this.userAccess.edit = this.userAccess.view = true;
      }
    });
  }

  ngOnInit() {}

  createForm(): void {
    this.inputForm = this.formBuilder.group({
      userId: [""],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      emailVerified: ["", [Validators.required]],
      emailAddress: ["", [Validators.required]],
      role: ["User", [Validators.required]],
      maxUsers: [10, [Validators.required]]
    });
  }

  createEditForm(user: IUser): void {
    this.inputForm = this.formBuilder.group({
      userId: [user.userId, [Validators.required]],
      firstName: [user.firstName, [Validators.required]],
      lastName: [user.lastName, [Validators.required]],
      emailVerified: [user.emailVerified, [Validators.required]],
      emailAddress: [user.emailAddress, [Validators.required]],
      role: [user.role, [Validators.required]],
      maxUsers: [user.maxUsers, [Validators.required]]
    });
  }

  onSubmit(isValid: boolean) {
    if (isValid) {
      if (this.user) {
        this.updateResource(this.inputForm.value);
      } else {
        this.createResource(this.inputForm.value);
      }
    }
  }

  onDelete() {
    this.deleteResource(this.user.userId);
  }

  updateResource(user: IUser): void {
    const userId = this.loginService.getUser().userId;
    this.userService.updateUser(user, userId).subscribe(res => {
      this.snackbarService.open("User Saved Successfully");
      this.emitRefresh();
    });
  }

  createResource(user: IUser): void {
    const userId = this.loginService.getUser().userId;
    this.userService.addUser(user, userId).subscribe(res => {
      this.snackbarService.open("User Added Successfully");
      this.emitRefresh();
    });
  }

  deleteResource(id): void {
    const userId = this.loginService.getUser().userId;
    this.userService.deleteUser(id, userId).subscribe(res => {
      this.emitRefresh();
    });
  }

  emitRefresh() {
    this.refresh.emit("");
  }

  checkDefined(resource: IUser): boolean {
    if (resource != null && resource !== undefined) {
      return true;
    }
    return false;
  }
}
