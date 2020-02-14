import { MatTableDataSource, MatDialog } from "@angular/material";
import { Component, OnInit, Renderer2 } from "@angular/core";
import {
  trigger,
  transition,
  style,
  animate,
  state
} from "@angular/animations";
import { LoginService } from "../../core/login/login.service";
import { UserService } from "src/app/core/user/user.service";
import { IUser } from "src/app/shared/models/user/user";
import { IUserAccessDto } from "src/app/shared/models/access/access";

@Component({
  selector: "erste-resources",
  templateUrl: "./resources.component.html",
  styleUrls: ["./resources.component.scss"],
  animations: [
    trigger("smoothInOut", [
      state("in", style({ "min-height": "30px", height: "auto" })),
      transition("void => *", [
        style({ "min-height": "0", height: "0" }),
        animate(200)
      ]),
      transition("* => void", [animate(200, style({ height: "0" }))])
    ]),
    trigger("fadeOut", [
      transition("* => void", [animate(200, style({ height: "0" }))])
    ]),
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class ResourcesComponent implements OnInit {
  displayedColumns = [
    "userid",
    "firstname",
    "lastname",
    "emailaddress",
    "emailverified",
    "role"
  ];
  dataSource = new MatTableDataSource();
  currentUser: IUser;
  buttonMessage = "Create";
  isOpen = false;
  isLoading = true;

  access: IUserAccessDto;

  super: IUser;

  get canCreate(): boolean {
    if (!this.access.create) {
      return false;
    }
    if (this.super.role == "Institute" || this.super.role == "Professor") {
      if (this.super) {
        return this.super.addedUsers < this.super.maxUsers;
      }
    }
    return true;
  }

  constructor(
    private userSerivce: UserService,
    private loginService: LoginService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.super = this.loginService.getUser();
    this.refreshDataTable();
  }

  refreshDataTable() {
    this.isLoading = true;
    const userId = this.loginService.getUser().userId;
    this.userSerivce.getUserInfo(userId).subscribe(user => {
      this.super = user;
    });
    this.userSerivce.getAllUsers(userId).subscribe((users: IUser[]) => {
      this.dataSource = new MatTableDataSource(this.addDetailColumn(users));
      this.dataSource.filterPredicate = this.dataFilter;
      this.isLoading = false;
    });
    this.userSerivce.getUserAllAccess(this.super.userId).subscribe(access => {
      this.access = access.userAccess;
      if (this.super.role != "Professor") {
        this.access.create = this.access.delete = this.access.edit = this.access.view = true;
      }
    });
  }

  toggleDialog() {
    this.isOpen = !this.isOpen;
  }

  openDialog() {
    let icon = document.getElementsByClassName("fa-plus")[0];
    this.buttonMessage = "Close";
    this.renderer.setStyle(icon, "transform", "rotate(45deg)");
    this.isOpen = true;
  }

  closeDialog() {
    let icon = document.getElementsByClassName("fa-plus")[0];
    this.buttonMessage = "Entry";
    this.renderer.setStyle(icon, "transform", "rotate(0deg)");
    this.isOpen = false;
  }

  isExpansionDetailRow(i: number, row: Object) {
    return row.hasOwnProperty("editor");
  }

  onRowClick(user: IUser, i: number) {
    this.dataSource.data.forEach(data => {
      data["expanded"] = false;
    });
    if (user == this.currentUser) this.currentUser = null;
    else {
      this.currentUser = user;
      this.dataSource.data[i + 1]["expanded"] = true;
    }
  }

  addDetailColumn(list: IUser[]) {
    const rows = [];
    list.forEach(element =>
      rows.push(element, { editor: true, expanded: false, element })
    );
    return rows;
  }

  dataFilter(data: any, filter) {
    const filterArr = JSON.parse(filter);
    const str = filterArr.val.toString().toLowerCase();
    const col = filterArr.col;
    if (data.editor) return true;
    return (
      data[col]
        .toString()
        .toLowerCase()
        .indexOf(str) != -1
    );
  }

  onFilter(col, val) {
    this.dataSource.filter = JSON.stringify({ col, val });
  }
}
