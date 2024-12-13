import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page/test-page.component';
import { LibInovaAuthModule } from '@libs-rast/angular-inova-auth-lib';

@NgModule({
  declarations: [TestPageComponent],
  imports: [
    CommonModule,
    LibInovaAuthModule,
  ]
})
export class PagesModule { }
