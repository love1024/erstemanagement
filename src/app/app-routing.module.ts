import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttdTrackerHomeComponent } from './attd-tracker/attd-tracker-home/attd-tracker-home.component';
import { PublishComponent } from './shared/components/publish/publish.component';

const routes: Routes = [
    { path: '', component: AttdTrackerHomeComponent },
    { path: 'attendance', component: AttdTrackerHomeComponent },
    { path: 'admin', component: AdminHomeComponent },
    { path: 'publish', component: PublishComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
