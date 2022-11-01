import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesReportsComponent } from './sales-reports.component';

const routes: Routes = [{ path: '', component: SalesReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesReportsRoutingModule { }
