import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //用于响应式表单
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    NgxEchartsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    NgxEchartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class ShareModule { }
