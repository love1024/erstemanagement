import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProjectResourceComponent } from './project-resource/project-resource.component';
import { ProjectResourceDialogComponent } from './project-resource/project-resource-dialog/project-resource-dialog.component';
import { ProjectEditorComponent } from './project-editor/project-editor.component';
import { ProjectComponent } from './projects/projects.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ProjectComponent, ProjectEditorComponent, ProjectResourceComponent, ProjectResourceDialogComponent]
})
export class ProjectModule { }
