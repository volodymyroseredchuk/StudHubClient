import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient } from '@angular/common/http';
import { FreelancerDTO } from '../model/freelancerDTO.model';

@Injectable({
    providedIn: 'root'
})
export class FreelanceService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/freelancer';
    }

    getRatingByUserUsername(username: String){
        return this.http.get<FreelancerDTO>(`${this.apiUrl}/rating/${username}`);
    }
}