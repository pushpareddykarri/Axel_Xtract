import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceReconciliationRoutingModule } from './service-reconciliation-routing.module';
import { ServiceReconciliationComponent } from './service-reconciliation.component';
import { HeaderModule } from '../../header/header.module';


@NgModule({
  declarations: [ServiceReconciliationComponent],
  imports: [
    CommonModule,
    ServiceReconciliationRoutingModule,HeaderModule
  ]
})
export class ServiceReconciliationModule { }
