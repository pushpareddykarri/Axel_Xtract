import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardNew2RoutingModule } from './dashboard-new2-routing.module';
import { DashboardNew2Component } from './dashboard-new2.component';
import { HeaderModule } from '../header/header.module';
// import { HeaderModule } from '../../header/header.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [DashboardNew2Component],
  imports: [
    CommonModule,
    DashboardNew2RoutingModule,
    HeaderModule,
    NgxSpinnerModule
  ]
})
export class DashboardNew2Module { }
