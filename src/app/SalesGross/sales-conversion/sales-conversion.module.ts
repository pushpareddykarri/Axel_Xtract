import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesConversionRoutingModule } from './sales-conversion-routing.module';
import { SalesConversionComponent } from './sales-conversion.component';
import { HeaderModule } from '../../header/header.module';


@NgModule({
  declarations: [SalesConversionComponent],
  imports: [
    CommonModule,
    SalesConversionRoutingModule,HeaderModule
  ]
})
export class SalesConversionModule { }
