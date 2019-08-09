import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPageComponent } from './index-page.component';
import { AllViewComponent } from './coding/all-view/all-view.component';

const routes: Routes = [
  {
    path: '', component: IndexPageComponent,
    children: [
      { path: '', component: AllViewComponent },//子路由初始加载
      { path: 'allView', component: AllViewComponent },
      { path: 'webView', loadChildren: () => import('./coding/web-view/web-view.module').then(m => m.WebViewModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexPageRoutingModule { }