import { AngularMaterialModule } from './angularmaterial.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AngularMaterialModule
    ],
    exports: [
        CommonModule,
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: []
})
export class SharedModule { }
