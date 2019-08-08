import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebViewComponent } from './web-view.component';

const routes: Routes = [
  {
    path: '', component: WebViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebViewRoutingModule { }
