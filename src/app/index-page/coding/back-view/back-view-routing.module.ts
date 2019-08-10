import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackViewComponent } from './back-view.component';

const routes: Routes = [
  {
    path: '', component: BackViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackViewRoutingModule { }
