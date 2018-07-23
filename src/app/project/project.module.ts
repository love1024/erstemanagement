import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProjectEditorComponent } from './project-editor/project-editor.component';
import { ProjectComponent } from './projects/projects.component';
import { ProjectResourceModule } from '../project-resource/project-resource.module';

@NgModule({
  imports: [
    SharedModule,
    ProjectResourceModule
  ],
  declarations: [ProjectComponent, ProjectEditorComponent]
})
export class ProjectModule { }
