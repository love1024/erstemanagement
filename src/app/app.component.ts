import { Component, Renderer2, ViewChild } from '@angular/core';
import { HeaderService } from './core/header/header.service';
import { LoginService } from './core/login/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';


@Component({
    selector: 'erste-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    isLoggedIn = false;
    @ViewChild('sidenav') sidenav: MatSidenav;

    constructor(private loginService: LoginService, private router: Router) { }

    ngOnInit() {
        this.isLoggedIn = this.loginService.isLoggedIn();
        this.loginService.getLogInOutEmitter().subscribe((isLoggedIn) => {
            this.isLoggedIn = isLoggedIn;
            this.isLoggedIn ? this.sidenav.open() : this.sidenav.close();
        })
    }

    toggleSidenav(isOpen: boolean) {
        return {
            'box-shadow': isOpen ? 'inset 10px 0 14px -7px rgba(10, 10, 10, 0.7)' : 'none'
        };
    }
}
