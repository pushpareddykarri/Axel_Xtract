import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitFloorplanComponent } from './cit-floorplan.component';

const routes: Routes = [{ path: '', component: CitFloorplanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitFloorplanRoutingModule { }
