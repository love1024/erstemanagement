import { AppStoreService } from './../../../core/app-store.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'erste-sidepanel',
    templateUrl: './sidepanel.component.html',
    styleUrls: ['./sidepanel.component.scss']
})
export class SidepanelComponent implements OnInit {

    user: string;
    designation: string;

    constructor(private renderer: Renderer2, private router: Router, private appstore: AppStoreService) { }

    ngOnInit() {
        this.appstore.AppData.subscribe(res => {
            this.user = res.name;
            this.designation = res.designation;
        });
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
