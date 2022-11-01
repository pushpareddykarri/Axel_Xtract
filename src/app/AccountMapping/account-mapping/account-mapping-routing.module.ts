import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountMappingComponent } from './account-mapping.component';

const routes: Routes = [{ path: '', component: AccountMappingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountMappingRoutingModule { }
