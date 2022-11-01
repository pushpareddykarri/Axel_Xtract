import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule,NgxSpinnerService } from 'ngx-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HeaderModule } from './header/header.module'

import { 
	IgxCalendarModule,
	IgxSelectModule,
	IgxCardModule,
	IgxInputGroupModule
 } from "igniteui-angular";

import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {DateFormatService} from './Core/Providers/DateFormat/date-format.service'
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,NgbModule,
    IgxCalendarModule,
	IgxSelectModule,
	IgxCardModule,
  Ng2SearchPipeModule,
  HeaderModule,
	IgxInputGroupModule,BsDatepickerModule.forRoot(),
  NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [NgbActiveModal,NgxSpinnerService,
 { provide: NgbDateParserFormatter, useClass: DateFormatService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
