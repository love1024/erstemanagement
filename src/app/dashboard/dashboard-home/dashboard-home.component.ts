import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/login/login.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'erste-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  userLength = 0;

  constructor(private loginService: LoginService, private userService: UserService) { }

  ngOnInit() {
    const userId = this.loginService.getUser().userId;
    this.userService.getAllUsers(userId).subscribe((users) => {
      this.userLength = users.length;
    });
  }

}
