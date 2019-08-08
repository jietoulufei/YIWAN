import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebViewComponent } from './web-view.component';
import { WebViewRoutingModule } from './web-view-routing.module';


@NgModule({
  declarations: [WebViewComponent],
  imports: [
    CommonModule,
    WebViewRoutingModule
  ],
  exports: []
})
export class WebViewModule { }
