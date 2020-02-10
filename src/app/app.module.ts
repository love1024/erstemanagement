import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { SidepanelComponent } from './shared/components/sidepanel/sidepanel.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthInterceptorService } from './core/http/auth-interceptor.service';
import { PasswordComponent } from './shared/components/password/password.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { ResourceModule } from './resource/resource.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
    declarations: [
        AppComponent,
        SidepanelComponent,
        HeaderComponent,
        LoginComponent,
        UnauthorizedComponent,
        PasswordComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        CoreModule,
        DashboardModule,
        ResourceModule,
        AppRoutingModule,
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
