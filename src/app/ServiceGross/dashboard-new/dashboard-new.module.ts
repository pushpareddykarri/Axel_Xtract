import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardNewRoutingModule } from './dashboard-new-routing.module';
import { DashboardNewComponent } from './dashboard-new.component';
import { HeaderModule } from '../../header/header.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [DashboardNewComponent],
  imports: [
    CommonModule,
    DashboardNewRoutingModule,
    HeaderModule,
    NgbModule,
    NgxSpinnerModule
  ],
  providers:[NgbActiveModal]
})
export class DashboardNewModule { }
