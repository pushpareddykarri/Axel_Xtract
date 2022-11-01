import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartsReconciliationComponent } from './parts-reconciliation.component';
import { HeaderModule } from '../../header/header.module';

const routes: Routes = [{ path: '', component: PartsReconciliationComponent }];

@NgModule({
  imports: [HeaderModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartsReconciliationRoutingModule { }
