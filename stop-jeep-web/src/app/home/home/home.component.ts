import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/data-service.service';
import { Observable } from 'rxjs';
import { BankAccount } from 'src/app/bankAcccount';
import { DlDateTimePickerChange } from 'angular-bootstrap-datetimepicker';
import * as moment from 'moment';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';
import { FirebaseUserModel } from '../../user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public balance: number;
  private userAccount: BankAccount;
  private name: String;
  private balanceInterval: any;
  user: FirebaseUserModel = new FirebaseUserModel();

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
    public authService: AuthService,
    private dataService: DataServiceService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    })
    this.name = this.user.name;

    this.getBalancesByUserId();

    this.balanceInterval = setInterval(() => {
      this.getBalancesByUserId();
    }, 1000);
  }

  private getBalancesByUserId() {
    this.dataService.getBalance(this.user.email).subscribe(data => this.balance$ = data.balance);
    this.dataService.getBalanceByDateTime(this.user.email, this.selectedDateUTC).subscribe(data => this.balanceByDateTime$ = data.totalBalance);
  }

  ngOnDestroy() {
    clearInterval(this.balanceInterval);
  }

  onCustomDateChange(event: DlDateTimePickerChange<Date>) {
    this.selectedDateUTC = moment.utc(this.selectedDate).format('YYYY-MM-DDTHH:mm:ss');
    this.dataService.getBalanceByDateTime(this.user.email, this.selectedDateUTC).subscribe(data => this.balanceByDateTime$ = data.totalBalance);
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log('Logout error', error);
      });
  }
}
