import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProjectResourceComponent } from './project-resource/project-resource.component';
import { ProjectEditorComponent } from './project-editor/project-editor.component';
import { ProjectComponent } from './projects/projects.component';
import { ProjectResourceEditorComponent } from './project-resource-editor/project-resource-editor.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ProjectComponent, ProjectEditorComponent, ProjectResourceComponent, ProjectResourceEditorComponent]
})
export class ProjectModule { }
