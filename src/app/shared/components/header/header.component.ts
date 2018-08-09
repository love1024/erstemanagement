import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../../core/header/header.service';
import { LoginService } from '../../../core/login/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { PasswordComponent } from '../password/password.component';

@Component({
  selector: 'erste-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  status = "Secure Login";
  constructor(
    private loginService: LoginService,
    private router: Router,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.loginService.getLogInOutEmitter().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.status = this.isLoggedIn ? "Management" : "Secure Login";
    })
  }

  signOut() {
    this.loginService.logout();
    this.loginService.emitLogInOut();
    this.router.navigateByUrl('/login');
  }

  openChangePassword() {
    this.bottomSheet.open(PasswordComponent);
  }
}
