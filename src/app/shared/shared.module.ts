import { AngularMaterialModule } from './angularmaterial.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AngularMaterialModule,
        RouterModule,
    ],
    exports: [
        CommonModule,
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    declarations: []
})
export class SharedModule { }
