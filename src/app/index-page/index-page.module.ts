import { NgModule } from '@angular/core';
import { IndexPageComponent } from './index-page.component';
import { IndexPageRoutingModule } from './index-page-routing.module';
import { AllViewComponent } from './coding/all-view/all-view.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    IndexPageComponent, 
    AllViewComponent, 
  ],
  imports: [
    ShareModule,
    IndexPageRoutingModule,
  ],
  exports: [],
  providers:[]
})
export class IndexPageModule { }
