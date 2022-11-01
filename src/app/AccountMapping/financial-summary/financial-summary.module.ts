import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialSummaryRoutingModule } from './financial-summary-routing.module';
import { FinancialSummaryComponent } from './financial-summary.component';
import { HeaderModule } from './../../header/header.module';


@NgModule({
  declarations: [FinancialSummaryComponent],
  imports: [
    CommonModule,
    FinancialSummaryRoutingModule,
    HeaderModule
  ]
})
export class FinancialSummaryModule { }
