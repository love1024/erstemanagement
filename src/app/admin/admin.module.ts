import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminResourcesComponent } from './admin-resources/admin-resources.component';
import { AdminDepartmentsComponent } from './admin-departments/admin-departments.component';
import { AdminBillingComponent } from './admin-billing/admin-billing.component';
import { DeptDialogComponent } from './admin-departments/dept-dialog/dept-dialog.component';
import { ResourceDialogComponent } from './admin-resources/resource-dialog/resource-dialog.component';
import { AdminTechnologyComponent } from './admin-technology/admin-technology.component';
import { TechDialogComponent } from './admin-technology/tech-dialog/tech-dialog.component';
import { LevelInfoComponent } from './level-info/level-info.component';
import { LevelInfoDialogComponent } from './level-info/level-info-dialog/level-info-dialog.component';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    declarations: [
        AdminHomeComponent,
        AdminResourcesComponent,
        AdminDepartmentsComponent,
        AdminBillingComponent,
        DeptDialogComponent,
        ResourceDialogComponent,
        AdminTechnologyComponent,
        TechDialogComponent,
        LevelInfoComponent,
        LevelInfoDialogComponent],
    entryComponents: [DeptDialogComponent, ResourceDialogComponent, TechDialogComponent, LevelInfoDialogComponent]
})
export class AdminModule { }
