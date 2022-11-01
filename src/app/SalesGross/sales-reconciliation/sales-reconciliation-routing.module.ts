import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesReconciliationComponent } from './sales-reconciliation.component';

const routes: Routes = [{ path: '', component: SalesReconciliationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesReconciliationRoutingModule { }
