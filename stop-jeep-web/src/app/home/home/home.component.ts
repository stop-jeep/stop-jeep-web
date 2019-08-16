import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';
import { Observable } from 'rxjs';
import { BankAccount } from 'src/app/bankAcccount';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public balance: number;
  private userAccount: BankAccount;
  balance$: Observable<any>;

  constructor(
    private dataService: DataServiceService
  ) { }

  ngOnInit() {
    console.log('hello');
    this.balance$ = this.dataService.getBalance('1');
    // this.getBalance(this.userAccount.userId);
  }

  getBalance(userId: string): void {
    // this.balance$ = this.dataService.getBalance(userId);
    this.dataService.getBalance(userId).subscribe(data =>
      console.log(data.balance) );
    console.log(this.balance);
  }

}
