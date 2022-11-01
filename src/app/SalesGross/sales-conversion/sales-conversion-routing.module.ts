import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesConversionComponent } from './sales-conversion.component';

const routes: Routes = [{ path: '', component: SalesConversionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesConversionRoutingModule { }
