import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { BaseService } from './base-service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../model/order.model';
import { ResultSubmission } from '../model/result-submission.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('accessToken')
  })
}


@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService{

  constructor(protected http: HttpClient) {
    super(http);
    this.apiUrl += '/orders';
  }

  getOrder(orderId:number): Observable<Order>{
      return this.http.get<Order>(`${this.apiUrl}/${orderId}`, httpOptions);
  }

  submitResult(resultFile: File, orderId:number) : Observable<ResultSubmission>{

    // insert here loading of file
    let fileUrl = { fileUrl: "test url"}
    return this.http.post<ResultSubmission>(`${this.apiUrl}/${orderId}/submit`, fileUrl, httpOptions)
  }
}