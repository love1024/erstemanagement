import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttdTrackerHomeComponent } from './attd-tracker/attd-tracker-home/attd-tracker-home.component';

const routes: Routes = [
    { path: '', component: AttdTrackerHomeComponent },
    { path: 'attdtracker', component: AttdTrackerHomeComponent },
    { path: 'admin', component: AdminHomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
