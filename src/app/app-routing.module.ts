import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttdTrackerHomeComponent } from './attd-tracker/attd-tracker-home/attd-tracker-home.component';
import { PublishComponent } from './shared/components/publish/publish.component';
import { ProjectHomeComponent } from './project/project-home/project-home.component';
import { ProjectResourceComponent } from './project/project-resource/project-resource.component';
import { ResourcesComponent } from './resource/resources/resources.component';

const routes: Routes = [
    { path: '', component: AttdTrackerHomeComponent },
    { path: 'attendance', component: AttdTrackerHomeComponent },
    { path: 'admin', component: AdminHomeComponent },
    { path: 'publish', component: PublishComponent },
    { path: 'project', component: ProjectHomeComponent },
    { path: 'project/:id', component: ProjectResourceComponent },
    { path: 'resource', component: ResourcesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
