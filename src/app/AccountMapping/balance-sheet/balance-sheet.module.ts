import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalanceSheetRoutingModule } from './balance-sheet-routing.module';
import { BalanceSheetComponent } from './balance-sheet.component';
import { HeaderModule } from 'src/app/header/header.module';


@NgModule({
  declarations: [BalanceSheetComponent],
  imports: [
    CommonModule,
    BalanceSheetRoutingModule,
    HeaderModule
  ]
})
export class BalanceSheetModule { }
 