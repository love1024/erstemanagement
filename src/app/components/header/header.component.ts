import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../core/header/header.service';

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
  }

}
