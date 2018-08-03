import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../../core/header/header.service';
import { LoginService } from '../../../core/login/login.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'erste-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  status: String;
  constructor(private loginService: LoginService, private router: Router) { }

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

}
