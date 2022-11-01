import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceReconciliationComponent } from './service-reconciliation.component';

const routes: Routes = [{ path: '', component: ServiceReconciliationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceReconciliationRoutingModule { }
