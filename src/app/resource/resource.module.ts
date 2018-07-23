import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceEditorComponent } from './resource-editor/resource-editor.component';
import { ProjectResourceModule } from '../project-resource/project-resource.module';

@NgModule({
  imports: [
    SharedModule,
    ProjectResourceModule
  ],
  declarations: [ResourceEditorComponent, ResourcesComponent]
})
export class ResourceModule { }
