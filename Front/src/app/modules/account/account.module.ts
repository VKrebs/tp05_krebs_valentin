import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AccountRoutingModule } from './account-routing.module';
import { AccountCreationFormComponent } from './components/account-creation-form/account-creation-form.component';
import { AccountCreationSummaryComponent } from './components/account-creation-summary/account-creation-summary.component';
import { PhoneNumberPipe } from './pipes/phone-number.pipe';

import { AccountsApiService } from './../../shared/services/accounts/accountsapi.service';


@NgModule({
  declarations: [AccountCreationFormComponent, AccountCreationSummaryComponent, PhoneNumberPipe],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AccountsApiService]
})
export class AccountModule { }
