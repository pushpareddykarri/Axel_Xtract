import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartsReportRoutingModule } from './parts-report-routing.module';
import { PartsReportComponent } from './parts-report.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { 
	IgxCalendarModule,
	IgxSelectModule,
	IgxCardModule,
	IgxInputGroupModule
 } from "igniteui-angular";
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [PartsReportComponent],
  imports: [
    CommonModule,
    PartsReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,BsDatepickerModule.forRoot(),
    NgbModule,
    IgxCalendarModule,
    IgxSelectModule,
    IgxCardModule,
    IgxInputGroupModule,
  NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class PartsReportModule { }
