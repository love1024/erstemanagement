import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceEditorComponent } from './resource-editor/resource-editor.component';
import { ResourceAccessComponent } from './resource-access/resource-access.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [ResourceEditorComponent, ResourcesComponent, ResourceAccessComponent]
})
export class ResourceModule { }
