import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgxEchartsModule
  ],
  exports:[
    CommonModule,
    NgZorroAntdModule,
    NgxEchartsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class ShareModule { }
