import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesReportsNewRoutingModule } from './sales-reports-new-routing.module';
import { SalesReportsNewComponent } from './sales-reports-new.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [SalesReportsNewComponent],
  imports: [
    CommonModule,
    SalesReportsNewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
  ]
})
export class SalesReportsNewModule { }
