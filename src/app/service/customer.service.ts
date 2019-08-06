import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { CustomerDTO } from '../model/customerDTO.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/customer';
    }

    getRatingByUserUsername(username: String){
        return this.http.get<CustomerDTO>(`${this.apiUrl}/rating/${username}`);
    }
}