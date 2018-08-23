import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReportsComponent } from './reports/reports.component';
import { ReportHomeComponent } from './report-home/report-home.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ReportsComponent, ReportHomeComponent]
})
export class ReportModule { }
