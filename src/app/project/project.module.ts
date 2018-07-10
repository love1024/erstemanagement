import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { ProjectDialogComponent } from './project-home/project-dialog/project-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ProjectHomeComponent, ProjectDialogComponent],
  entryComponents: [ProjectDialogComponent]
})
export class ProjectModule { }
