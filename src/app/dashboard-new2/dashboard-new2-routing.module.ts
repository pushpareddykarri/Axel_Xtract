import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardNew2Component } from './dashboard-new2.component';

const routes: Routes = [{ path: '', component: DashboardNew2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardNew2RoutingModule { }
