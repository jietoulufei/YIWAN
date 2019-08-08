import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexPageComponent } from './index-page.component';
import { IndexPageRoutingModule } from './index-page-routing.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { AllViewComponent } from './coding/all-view/all-view.component';

@NgModule({
  declarations: [
    IndexPageComponent, 
    AllViewComponent, 
  ],
  imports: [
    CommonModule,
    IndexPageRoutingModule,
    NgZorroAntdModule
  ],
  exports: [IndexPageComponent]
})
export class IndexPageModule { }
