import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountMappingRoutingModule } from './account-mapping-routing.module';
import { AccountMappingComponent } from './account-mapping.component';
import { HeaderModule } from '../../header/header.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [AccountMappingComponent],
  imports: [
    CommonModule,
    AccountMappingRoutingModule,
    HeaderModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,NgbModule
  ],
  providers:[NgbActiveModal],
})
export class AccountMappingModule { }
