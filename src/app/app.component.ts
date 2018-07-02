import { Component, Renderer2, ViewChild ElementRef } from '@angular/core';
import { HeaderService } from './core/header/header.service';


@Component({
  selector: 'erste-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'erste';
  @ViewChild("sidepanel") sidepanel: ElementRef;

  constructor(private headerService: HeaderService, private renderer: Renderer2) { }

  ngOnInit() {
    this.headerService.getTogglePanelEmitter().subscribe((expand) => {
      this.renderer.setStyle(this.sidepanel.nativeElement, "width", expand ? "20%" : 0);
    })
  }
}
