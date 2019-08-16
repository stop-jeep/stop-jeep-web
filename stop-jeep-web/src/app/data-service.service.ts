import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  getBalance(userId: string): Observable<any> {
    const url = 'http://35.247.172.56:8080/users/' + userId + '/balances';
    return this.http.get(url);
  }

  getBalanceByDateTime(userId: string, dateTime: string): Observable<any> {
    const url = `http://35.247.172.56:8080/users/${userId}/balances?dateTime=${dateTime}`;
    return this.http.get(url);
  }
}
