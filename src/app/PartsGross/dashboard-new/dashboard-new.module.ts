import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardNewRoutingModule } from './dashboard-new-routing.module';
import { DashboardNewComponent } from './dashboard-new.component';
import { HeaderModule } from 'src/app/header/header.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [DashboardNewComponent],
  imports: [
    CommonModule,
    DashboardNewRoutingModule,
    HeaderModule,
    NgxSpinnerModule 
  ]
})
export class DashboardNewModule { }
