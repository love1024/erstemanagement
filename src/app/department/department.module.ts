import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentEditorComponent } from './department-editor/department-editor.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [DepartmentsComponent, DepartmentEditorComponent]
})
export class DepartmentModule { }
