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

  baseUrl;

  constructor(protected http: HttpClient) {
    super(http);
    this.baseUrl = this.apiUrl;
    this.apiUrl += '/orders';
  }

  getOrder(orderId:number): Observable<Order>{
      return this.http.get<Order>(`${this.apiUrl}/${orderId}`, httpOptions);
  }

  getAssignedOrders() :Observable<Order[]>{
      return this.http.get<Order[]>(`${this.apiUrl}/assigned/my`, httpOptions);
  }

  getCreatedOrders() :Observable<Order[]>{
    return this.http.get<Order[]>(`${this.apiUrl}/created/my`, httpOptions);
}

  submitResult(resultFileUrl: String, orderId:number) : Observable<ResultSubmission>{
    return this.http.post<ResultSubmission>(`${this.apiUrl}/${orderId}/submit`, { fileUrl: resultFileUrl }, httpOptions)
  }

  submitFile(resultFile: File): Observable<{message: String}> {
    return this.http.post<{message: String}>(`${this.baseUrl}/files/upload`, {multiPartFile: resultFile }, httpOptions)
  }

  cancelOrder( orderId:number) : Observable<Order>{
    return this.http.post<Order>(`${this.apiUrl}/${orderId}/cancel`, {}, httpOptions)
  }
}