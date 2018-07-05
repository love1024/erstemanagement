import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { HeaderService } from './core/header/header.service';


@Component({
    selector: 'erste-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'erste';
    constructor() { }
}
