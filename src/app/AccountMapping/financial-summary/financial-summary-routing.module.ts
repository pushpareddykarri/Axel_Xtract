import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialSummaryComponent } from './financial-summary.component';

const routes: Routes = [{ path: '', component: FinancialSummaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialSummaryRoutingModule { }
