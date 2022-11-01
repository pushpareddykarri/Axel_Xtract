import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScDetailsRoutingModule } from './sc-details-routing.module';
import { ScDetailsComponent } from './sc-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ScDetailsComponent],
  imports: [
    CommonModule,
    ScDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ScDetailsModule { }
