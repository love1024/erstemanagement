import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  isPanelOpen = true;
  emitTogglePanel: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
    this.emitTogglePanel.emit(this.isPanelOpen);
  }

  getTogglePanelEmitter() {
    return this.emitTogglePanel;
  }
}
