import { NgModule } from '@angular/core';

import { EditCodingRoutingModule } from './edit-coding-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { EditCodingComponent } from './edit-coding.component';


@NgModule({
  declarations: [EditCodingComponent],
  imports: [
    ShareModule,
    EditCodingRoutingModule
  ]
})
export class EditCodingModule { }
