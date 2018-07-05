import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'erste-sidepanel',
    templateUrl: './sidepanel.component.html',
    styleUrls: ['./sidepanel.component.scss']
})
export class SidepanelComponent implements OnInit {

    constructor(private renderer: Renderer2, private router: Router) { }

    ngOnInit() {
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
