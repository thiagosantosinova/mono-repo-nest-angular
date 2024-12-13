import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestPageComponent } from './pages/test-page/test-page.component';

const routes: Routes = [
  {
    path: '',
    component: TestPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'test-page'
      },
      {
        path: 'test-page',
        component: TestPageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
