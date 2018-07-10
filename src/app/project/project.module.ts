import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { ProjectDialogComponent } from './project-home/project-dialog/project-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProjectResourceComponent } from './project-resource/project-resource.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'project', component: ProjectHomeComponent }
    ])
  ],
  declarations: [ProjectHomeComponent, ProjectDialogComponent, ProjectResourceComponent],
  entryComponents: [ProjectDialogComponent]
})
export class ProjectModule { }
