import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { ProjectDialogComponent } from './project-home/project-dialog/project-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProjectResourceComponent } from './project-resource/project-resource.component';
import { ProjectResourceDialogComponent } from './project-resource/project-resource-dialog/project-resource-dialog.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ProjectHomeComponent, ProjectDialogComponent, ProjectResourceComponent, ProjectResourceDialogComponent],
  entryComponents: [ProjectDialogComponent, ProjectResourceDialogComponent]
})
export class ProjectModule { }
