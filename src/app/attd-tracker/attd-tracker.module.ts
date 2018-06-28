import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttdTrackerHomeComponent } from './attd-tracker-home/attd-tracker-home.component';
import { AttendanceDialogComponent } from './attendance-dialog/attendance-dialog.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [AttdTrackerHomeComponent, AttendanceDialogComponent],
    entryComponents: [AttendanceDialogComponent]
})
export class AttdTrackerModule { }
