import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderModule } from '../../header/header.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeaderModule,
    NgxSpinnerModule 
  ]
})
export class DashboardModule { }
