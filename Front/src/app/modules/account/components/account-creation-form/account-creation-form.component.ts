import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from '../../../../shared/models/account';
import { FieldValidationService } from '../../../../shared/services/forms/field-validation.service'
import { AccountsApiService } from '../../../../shared/services/accounts/accountsapi.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-creation-form',
  templateUrl: './account-creation-form.component.html',
  styleUrls: ['./account-creation-form.component.css']
})
export class AccountCreationFormComponent implements OnInit {

  account:Account = new Account();
  accountResponse:Observable<Account>;
  passwordConfirmation:string;
  validated:boolean = false;

  accountForm : FormGroup = new FormGroup({
    civility: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern('[A-Za-z]*')]),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern('[A-Za-z]*')]),
    address: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("[0-9]{1,3},{0,1}\\s[A-Za-z\\s]{1,50}")]),
    cp: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.pattern("[0-9]{5}")]),
    city: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern("[a-zA-Z_-]{1,30}")]),
    country: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern("[a-zA-Z_-]{1,30}")]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.pattern("^\\+[0-9]{11,13}")]),
    email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]),
    login: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern("^[a-zA-Z0-9_-]{3,15}$")]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    }, this.passwordsShouldMatch
  );

  constructor(private validatorService : FieldValidationService, private accountsApiService : AccountsApiService) { }

  private passwordsShouldMatch(fGroup: FormGroup) {
    return fGroup.get('password').value === fGroup.get('passwordConfirmation').value
      ? null : {'passwordMissmatch': true};
  }

  onSubmit(): void
  {
    if (this.accountForm.valid)
    {
      this.account.civility = this.accountForm.controls.civility.value;
      this.account.lastname = this.accountForm.controls.lastName.value;
      this.account.firstname = this.accountForm.controls.firstName.value;
      this.account.address = this.accountForm.controls.address.value;
      this.account.postalcode = this.accountForm.controls.cp.value;
      this.account.city = this.accountForm.controls.city.value;
      this.account.country = this.accountForm.controls.country.value;
      this.account.phone = this.accountForm.controls.phone.value;
      this.account.email = this.accountForm.controls.email.value;
      this.account.login = this.accountForm.controls.login.value;
      this.account.password = this.accountForm.controls.password.value;
      this.accountResponse = this.accountsApiService.registerAccount(this.account);

      this.validated = true;
    } 
    else 
    {
      this.validateAllFormFields(this.accountForm)
    }
  }

  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.validateAllFormFields(control);            
      }
  });
}

  isValidInput(fieldName:string): boolean {
    return this.accountForm.controls[fieldName].invalid &&
    (this.accountForm.controls[fieldName].dirty || this.accountForm.controls[fieldName].touched);
  }  

  ngOnInit(): void {
  }

}
