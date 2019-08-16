import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';
import { Observable } from 'rxjs';
import { BankAccount } from 'src/app/bankAcccount';
import { DlDateTimePickerChange } from 'angular-bootstrap-datetimepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public balance: number;
  private userAccount: BankAccount;
  private name: String;

  maxView = 'year';
  minuteStep = 5;
  minView = 'minute';
  selectedDate: Date;
  selectedDateUTC: string;
  showCalendar = true;
  startView = 'day';
  views = ['minute', 'hour', 'day', 'month', 'year'];
  balance$: Observable<any>;
  balanceByDateTime$: Observable<any>;

  constructor(
    private dataService: DataServiceService
  ) { }

  ngOnInit() {
    this.name = 'Mr. Jeep';
    this.balance$ = this.dataService.getBalance('b');
  }

  onCustomDateChange(event: DlDateTimePickerChange<Date>) {
    this.selectedDateUTC = moment.utc(this.selectedDate).format('YYYY-MM-DDTHH:mm:ss');
    this.balanceByDateTime$ = this.dataService.getBalanceByDateTime('b', this.selectedDateUTC);
  }
}
