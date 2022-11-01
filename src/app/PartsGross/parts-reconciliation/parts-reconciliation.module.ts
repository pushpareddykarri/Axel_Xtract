import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartsReconciliationRoutingModule } from './parts-reconciliation-routing.module';
import { PartsReconciliationComponent } from './parts-reconciliation.component';
import { HeaderModule } from '../../header/header.module';


@NgModule({
  declarations: [PartsReconciliationComponent],
  imports: [
    CommonModule,
    PartsReconciliationRoutingModule,HeaderModule
  ]
})
export class PartsReconciliationModule { }
