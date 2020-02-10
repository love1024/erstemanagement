import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/login/login.service';
import { IUser } from '../../models/user/user';

@Component({
    selector: 'erste-sidepanel',
    templateUrl: './sidepanel.component.html',
    styleUrls: ['./sidepanel.component.scss']
})
export class SidepanelComponent implements OnInit {

    user: IUser;
    designation: string;

    constructor(
        private renderer: Renderer2,
        private router: Router,
        private loginService: LoginService) { }

    ngOnInit() {
        this.user = this.loginService.getUser();
        this.loginService.getLogInOutEmitter().subscribe((isLoggedIn) => {
            if (isLoggedIn) {
                this.user = this.loginService.getUser();
            }
        })
    }

    onItemClick(event) {
        if (event.target.classList.contains('panelItem')) {
            this.addActiveClass(event.target);
        }
    }

    addActiveClass(curEl) {
        const elements = document.getElementsByClassName('panelItem');
        for (let i = 0; i < elements.length; i++) {
            this.renderer.removeClass(elements[i], 'active');
        }
        this.renderer.addClass(curEl, 'active');
    }
}
