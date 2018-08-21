import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { SidepanelComponent } from './shared/components/sidepanel/sidepanel.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { PublishComponent } from './shared/components/publish/publish.component';
import { ProjectModule } from './project/project.module';
import { ResourceModule } from './resource/resource.module';
import { AttendanceModule } from './attendance/attendance.module';
import { DepartmentModule } from './department/department.module';
import { ProjectResourceModule } from './project-resource/project-resource.module';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthInterceptorService } from './core/http/auth-interceptor.service';
import { PasswordComponent } from './shared/components/password/password.component';
import { JobComponent } from './shared/components/job/job.component';
import { TaskModule } from './task/task.module';
import { ReportModule } from './report/report.module';

@NgModule({
    declarations: [
        AppComponent,
        SidepanelComponent,
        HeaderComponent,
        PublishComponent,
        LoginComponent,
        JobComponent,
        PasswordComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        CoreModule,
        AdminModule,
        AttendanceModule,
        ProjectModule,
        ResourceModule,
        DepartmentModule,
        ProjectResourceModule,
        TaskModule,
        ReportModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
