import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BalanceSheetReportsComponent } from './balance-sheet-reports.component';

const routes: Routes = [{ path: '', component: BalanceSheetReportsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceSheetReportsRoutingModule { }
