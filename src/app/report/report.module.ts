import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ReportsComponent]
})
export class ReportModule { }
