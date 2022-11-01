import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScReportsComponent } from './sc-reports.component';

const routes: Routes = [{ path: '', component: ScReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScReportsRoutingModule { }
