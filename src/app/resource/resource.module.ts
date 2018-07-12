import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceEditorComponent } from './resource-editor/resource-editor.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ResourceEditorComponent, ResourcesComponent]
})
export class ResourceModule { }
