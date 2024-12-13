import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonLogoutComponent } from './button-logout/button-logout.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { FormModalLoginComponent } from './form-modal-login/form-modal-login.component';

const components = [
  ButtonLogoutComponent,
  FormLoginComponent,
  FormModalLoginComponent
]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule
  ],
  exports: [components]
})
export class LibComponentsModule { }
