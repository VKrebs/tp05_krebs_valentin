import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { Store } from "@ngxs/store";

import { AccountsApiService } from '../../../../shared/services/accounts/accountsapi.service'
import { ConnectUser } from 'src/app/shared/actions/user-actions';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  connected:Observable<boolean>;
  connectionError:boolean;

  accountForm : FormGroup = new FormGroup(
    {
      login: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern("^.{1,15}$")]),
      password: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern("^.{1,30}$")]),
    }
  );
  constructor(private accountsApiService : AccountsApiService, private router : Router, private store : Store) { }

  ngOnInit(): void {
  }

  onSubmit(): void
  {
    if (this.accountForm.valid)
    {
      this.connectionError = false;
      this.connected = this.accountsApiService.login(this.accountForm.controls.login.value, this.accountForm.controls.password.value);
      this.connected.subscribe( isConnected => {
        if (isConnected) {
          this.router.navigate(['/catalog']);
        } else {
          this.connectionError = true;
        }
      });
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

}
