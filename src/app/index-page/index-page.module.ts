import { NgModule } from '@angular/core';
import { IndexPageComponent } from './index-page.component';
import { IndexPageRoutingModule } from './index-page-routing.module';
import { AllViewComponent } from './coding/all-view/all-view.component';
import { ShareModule } from '../share/share.module';
import { ToolsViewComponent } from './coding/tools-view/tools-view.component';

@NgModule({
  declarations: [
    IndexPageComponent, 
    AllViewComponent, ToolsViewComponent, 
  ],
  imports: [
    ShareModule,
    IndexPageRoutingModule,
  ],
  exports: [],
  providers:[]
})
export class IndexPageModule { }
