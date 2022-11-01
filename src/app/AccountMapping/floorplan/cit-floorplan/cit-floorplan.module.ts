import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitFloorplanRoutingModule } from './cit-floorplan-routing.module';
import { CitFloorplanComponent } from './cit-floorplan.component';
import { HeaderModule } from '../../../header/header.module';


@NgModule({
  declarations: [CitFloorplanComponent],
  imports: [
    CommonModule,
    CitFloorplanRoutingModule,HeaderModule
  ]
})
export class CitFloorplanModule { }
