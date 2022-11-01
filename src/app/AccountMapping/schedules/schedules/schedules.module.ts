import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulesRoutingModule } from './schedules-routing.module';
import { SchedulesComponent } from './schedules.component';
import { HeaderModule } from 'src/app/header/header.module';



@NgModule({
  declarations: [SchedulesComponent],
  imports: [
    CommonModule,
    SchedulesRoutingModule,
    HeaderModule
  ]
})
export class SchedulesModule { }
