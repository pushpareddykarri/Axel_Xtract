import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialSummaryNewRoutingModule } from './financial-summary-new-routing.module';
import { FinancialSummaryNewComponent } from './financial-summary-new.component';
import { HeaderModule } from 'src/app/header/header.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [FinancialSummaryNewComponent],
  imports: [
    CommonModule,
    FinancialSummaryNewRoutingModule,
    HeaderModule,
    NgxSpinnerModule
  ]
})
export class FinancialSummaryNewModule { }
