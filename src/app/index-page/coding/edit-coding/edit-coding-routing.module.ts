import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCodingComponent } from './edit-coding.component';


const routes: Routes = [
  {
    path: '', component: EditCodingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCodingRoutingModule { }
