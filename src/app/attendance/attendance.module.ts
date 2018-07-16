import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceEditorComponent } from './attendance-editor/attendance-editor.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [AttendanceComponent, AttendanceEditorComponent]
})
export class AttendanceModule { }
