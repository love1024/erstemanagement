import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceService } from '../../../core/resource/resource.service';
import { LoginService } from '../../../core/login/login.service';
import { Resource } from '../../models/admin/resource.model';

@Component({
    selector: 'erste-sidepanel',
    templateUrl: './sidepanel.component.html',
    styleUrls: ['./sidepanel.component.scss']
})
export class SidepanelComponent implements OnInit {

    user: string;
    designation: string;

    constructor(
        private renderer: Renderer2,
        private router: Router,
        private loginService: LoginService,
        private resourceService: ResourceService) { }

    ngOnInit() {
        this.loginService.getLogInOutEmitter().subscribe((isLoggedIn) => {
            if (isLoggedIn) {
                this.getResourceInformation();
            }
        })
    }

    getResourceInformation() {
        let managerId = this.loginService.getManagerId();
        this.resourceService.getResourceById(managerId, true).subscribe((resource: Resource[]) => {
            this.user = resource[0].resourceName;
            this.designation = (resource[0].role).toUpperCase();
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
