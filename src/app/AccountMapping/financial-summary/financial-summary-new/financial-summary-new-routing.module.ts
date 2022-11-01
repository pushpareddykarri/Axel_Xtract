import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancialSummaryNewComponent } from './financial-summary-new.component';

const routes: Routes = [{ path: '', component: FinancialSummaryNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialSummaryNewRoutingModule { }
