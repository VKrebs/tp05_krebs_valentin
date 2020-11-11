import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../../../../shared/models/account';

@Component({
  selector: 'app-account-creation-summary',
  templateUrl: './account-creation-summary.component.html',
  styleUrls: ['./account-creation-summary.component.css']
})
export class AccountCreationSummaryComponent implements OnInit {

  @Input() account: Observable<Account>;

  constructor() { }

  ngOnInit(): void {
    console.log("initialised");
    console.log(this.account);
  }

}
