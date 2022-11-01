import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitReportRoutingModule } from './cit-report-routing.module';
import { CitReportComponent } from './cit-report.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { 	IgxCalendarModule,	IgxSelectModule,	IgxCardModule,	IgxInputGroupModule } from "igniteui-angular";
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [CitReportComponent],
  imports: [
    CommonModule,
    CitReportRoutingModule, FormsModule,
    ReactiveFormsModule,BsDatepickerModule.forRoot(),
    NgbModule,
    IgxCalendarModule,
    IgxSelectModule,
    IgxCardModule,
    IgxInputGroupModule,
  NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class CitReportModule { }
