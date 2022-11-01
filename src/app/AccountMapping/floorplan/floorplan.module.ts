import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloorplanRoutingModule } from './floorplan-routing.module';
import { FloorplanComponent } from './floorplan.component';
import { HeaderModule } from '../../header/header.module';


@NgModule({
  declarations: [FloorplanComponent],
  imports: [
    CommonModule,
    FloorplanRoutingModule,
    HeaderModule
  ]
})
export class FloorplanModule { }
