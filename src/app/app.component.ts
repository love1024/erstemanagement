import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { HeaderService } from './core/header/header.service';
import { LoginService } from './core/login/login.service';


@Component({
    selector: 'erste-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    isLoggedIn: boolean;
    constructor(private loginService: LoginService) { }

    ngOnInit() {
        this.isLoggedIn = this.loginService.isLoggedIn();
        console.log("Is Logged In:" + this.isLoggedIn);
    }

    toggleSidenav(isOpen: boolean) {
        return {
            'box-shadow': isOpen ? 'inset 10px 0 14px -7px rgba(10, 10, 10, 0.7)' : 'none'
        };
    }
}
