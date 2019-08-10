import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPageComponent } from './index-page.component';
import { AllViewComponent } from './coding/all-view/all-view.component';
import { ToolsViewComponent } from './coding/tools-view/tools-view.component';

const routes: Routes = [
  {
    path: '', component: IndexPageComponent,
    children: [
      { path: '', component: AllViewComponent },//子路由初始加载
      { path: 'allView', component: AllViewComponent },
      { path: 'webView', loadChildren: () => import('./coding/web-view/web-view.module').then(m => m.WebViewModule) },
      { path: 'backView', loadChildren: () => import('./coding/back-view/back-view.module').then(m => m.BackViewModule) },
      { path: 'toolsView', component: ToolsViewComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexPageRoutingModule { }
