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
    this.router.events.subscribe((val) => {
      this.isLoggedIn = this.loginService.isLoggedIn();
      this.status = this.isLoggedIn ? "Management" : "Secure Login";
    })
  }

  signOut() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }

}
