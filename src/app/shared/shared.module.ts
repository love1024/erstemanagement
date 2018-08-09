import { AngularMaterialModule } from './angularmaterial.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordComponent } from './components/password/password.component';

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
    declarations: [],
    entryComponents: [PasswordComponent]
})
export class SharedModule { }
