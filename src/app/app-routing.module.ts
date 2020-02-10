import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcesComponent } from './resource/resources/resources.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthGuardService } from './core/http/auth-guard.service';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'user', component: ResourcesComponent, canActivate: [AuthGuardService] },
    { path: 'dashboard', component: DashboardHomeComponent, canActivate: [AuthGuardService]},
    { path: 'unauthorized', component: UnauthorizedComponent},
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
