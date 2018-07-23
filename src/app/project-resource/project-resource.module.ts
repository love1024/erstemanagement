import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectResourceComponent } from './project-resource/project-resource.component';
import { ProjectResourceEditorComponent } from './project-resource-editor/project-resource-editor.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ProjectResourceComponent, ProjectResourceEditorComponent],
  exports: [ProjectResourceComponent]
})
export class ProjectResourceModule { }
