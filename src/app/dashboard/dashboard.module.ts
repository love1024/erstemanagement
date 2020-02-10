import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/http/auth-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DashboardHomeComponent]
})
export class DashboardModule { }
