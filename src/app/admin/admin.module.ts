import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminResourcesComponent } from './admin-resources/admin-resources.component';
import { AdminProjectsComponent } from './admin-projects/admin-projects.component';
import { AdminDepartmentsComponent } from './admin-departments/admin-departments.component';
import { AdminBillingComponent } from './admin-billing/admin-billing.component';
import { DeptDialogComponent } from './admin-departments/dept-dialog/dept-dialog.component';
import { ResourceDialogComponent } from './admin-resources/resource-dialog/resource-dialog.component';
import { ProjectDialogComponent } from './admin-projects/project-dialog/project-dialog.component';
import { AdminTechnologyComponent } from './admin-technology/admin-technology.component';
import { TechDialogComponent } from './admin-technology/tech-dialog/tech-dialog.component';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    declarations: [
        AdminHomeComponent,
        AdminResourcesComponent,
        AdminProjectsComponent,
        AdminDepartmentsComponent,
        AdminBillingComponent,
        DeptDialogComponent,
        ResourceDialogComponent,
        ProjectDialogComponent,
        AdminTechnologyComponent,
        TechDialogComponent],
    entryComponents: [DeptDialogComponent, ResourceDialogComponent, ProjectDialogComponent, TechDialogComponent]
})
export class AdminModule { }
