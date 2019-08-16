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

    // const mockUrl = 'http://www.mocky.io/v2/5d565ebd300000360030a9c1';
    // return this.http.get(mockUrl);

    // return of(20000);
  }
}
