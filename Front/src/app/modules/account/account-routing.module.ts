import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountCreationFormComponent } from './components/account-creation-form/account-creation-form.component';

const routes: Routes = [{ path: '', component: AccountCreationFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
