import { NgModule } from '@angular/core';
import { LibInovaAuthComponent } from './lib-inova-auth.component';
import { CommonModule } from '@angular/common';
import { LibComponentsModule } from './components/lib-components.module';

@NgModule({
  declarations: [LibInovaAuthComponent],
  imports: [CommonModule, LibComponentsModule],
  exports: [LibInovaAuthComponent, LibComponentsModule]
})
export class LibInovaAuthModule { }
