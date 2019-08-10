import { NgModule } from '@angular/core';
import { ShareModule } from 'src/app/share/share.module';
import { BackViewComponent } from './back-view.component';
import { BackViewRoutingModule } from './back-view-routing.module';

@NgModule({
  declarations: [BackViewComponent],
  imports: [
    ShareModule,
    BackViewRoutingModule
  ],
  exports: []
})
export class BackViewModule { }
