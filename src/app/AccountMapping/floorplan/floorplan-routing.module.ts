import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FloorplanComponent } from './floorplan.component';

const routes: Routes = [{ path: '', component: FloorplanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorplanRoutingModule { }
