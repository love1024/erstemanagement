import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
    declarations: [
        AppComponent,
        SidepanelComponent,
        HeaderComponent,
        PublishComponent
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
        ResourceModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
