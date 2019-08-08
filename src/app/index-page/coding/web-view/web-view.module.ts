import { NgModule } from '@angular/core';
import { WebViewComponent } from './web-view.component';
import { WebViewRoutingModule } from './web-view-routing.module';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [WebViewComponent],
  imports: [
    ShareModule,
    WebViewRoutingModule
  ],
  exports: []
})
export class WebViewModule { }
