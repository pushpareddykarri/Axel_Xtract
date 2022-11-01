import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobTitlesRoutingModule } from './job-titles-routing.module';
import { JobTitlesComponent } from './job-titles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderModule } from './../../header/header.module';

@NgModule({
  declarations: [JobTitlesComponent],
  imports: [
    CommonModule,
    JobTitlesRoutingModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule
  ]
})
export class JobTitlesModule { }
