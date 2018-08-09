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
import { AuthGuardService } from './core/http/auth-guard.service';
import { JobComponent } from './shared/components/job/job.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuardService] },
    { path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuardService] },
    { path: 'publish', component: PublishComponent, canActivate: [AuthGuardService] },
    { path: 'project', component: ProjectComponent, canActivate: [AuthGuardService] },
    { path: 'resource', component: ResourcesComponent, canActivate: [AuthGuardService] },
    { path: 'department', component: DepartmentsComponent, canActivate: [AuthGuardService] },
    { path: 'job', component: JobComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
