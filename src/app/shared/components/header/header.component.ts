import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../../core/header/header.service';

@Component({
  selector: 'erste-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
  }

  togglePanel() {
    this.headerService.togglePanel();
    this.toggleRotate();
  }

  toggleRotate() {
    const el = document.getElementsByTagName('i')[0];
    console.log(el);
    if (el.classList.contains('rotate')) {
    //   this.renderer.removeClass(el, 'rotate');
    } else {
    //   this.renderer.addClass(el, 'rotate');
    }
  }

}
