import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublishComponent } from './shared/components/publish/publish.component';
import { ResourcesComponent } from './resource/resources/resources.component';
import { ProjectComponent } from './project/projects/projects.component';
import { AttendanceComponent } from './attendance/attendance/attendance.component';
import { DepartmentsComponent } from './department/departments/departments.component';
import { ProjectResourceComponent } from './project-resource/project-resource/project-resource.component';
import { LoginComponent } from './shared/components/login/login.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'attendance', component: AttendanceComponent },
    { path: 'admin', component: AdminHomeComponent },
    { path: 'publish', component: PublishComponent },
    { path: 'project', component: ProjectComponent },
    { path: 'resource', component: ResourcesComponent },
    { path: 'department', component: DepartmentsComponent },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
