import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesReportsNewComponent } from './sales-reports-new.component';

const routes: Routes = [{ path: '', component: SalesReportsNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesReportsNewRoutingModule { }
