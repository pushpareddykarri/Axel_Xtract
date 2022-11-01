import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgxPrintModule
  ],
  providers:[NgbActiveModal],
  exports: [HeaderComponent],
})
export class HeaderModule { }
