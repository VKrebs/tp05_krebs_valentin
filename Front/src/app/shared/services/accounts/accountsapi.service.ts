import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngxs/store';

import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';


import { Account } from '../../models/account';
import { environment } from '../../../../environments/environment';
import { JsonPipe } from '@angular/common';
import { ConnectUser } from '../../actions/user-actions';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountsApiService {

  constructor(private http:HttpClient, private store:Store) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  
  public registerAccount (account:Account) : Observable<Account>
  {
    let body:URLSearchParams = new URLSearchParams();
    body.set("account", JSON.stringify(account));

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    return this.http.post<Account>(environment.backendAccounts + "api/client/register", body.toString(), httpOptions).pipe(
      map(result => JSON.parse(result as unknown as string))
    );
  }

  public login (login:string, password:string) : Observable<boolean>
  {
    let body:URLSearchParams = new URLSearchParams();
    body.set("login", login);
    body.set("password", password);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      }),
      observe: 'response' as 'body'
    }

    return this.http.post<boolean>(environment.backendAccounts + "api/client/login", body.toString(), httpOptions).pipe(
      map(resp => 
        {
          let usr:User = new User();
          usr.jwt_token = resp['headers'].get("authorization");
          usr.login = login;
          this.store.dispatch(new ConnectUser(usr));
          return true
        }),
      catchError(val => of(false))
    )
  }
}
