import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesReconciliationRoutingModule } from './sales-reconciliation-routing.module';
import { SalesReconciliationComponent } from './sales-reconciliation.component';
import { HeaderModule } from '../../header/header.module';


@NgModule({
  declarations: [SalesReconciliationComponent],
  imports: [
    CommonModule,
    SalesReconciliationRoutingModule,HeaderModule
  ]
})
export class SalesReconciliationModule { }
