import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base-service';
import { Observable } from 'rxjs';
import { Delete } from '../model/delete.model';
import { ProposalPaginatedDTO } from '../model/proposalPaginatedDTO.model';
import { Proposal } from '../model/proposal.model';
import { Order } from '../model/order.model';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('accessToken')
    })
  }

@Injectable({
    providedIn: 'root'
})
export class ProposalService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/tasks';
    }

    getAllProposalsByTaskId(id: number, paginationSettings: string): Observable<ProposalPaginatedDTO> {
        return this.http.get<ProposalPaginatedDTO>(`${this.apiUrl}/${id}/proposals` + paginationSettings);
    }

    getProposal(taskId: number, id: number): Observable<Proposal> {
        return this.http.get<Proposal>(`${this.apiUrl}/${taskId}/proposals/${id}`);
    }

    createProposal(taskId: number, proposal: Proposal): Observable<Proposal> {
        return this.http.post<Proposal>(`${this.apiUrl}/${taskId}/proposals/create`, proposal, httpOptions);
    }

    deleteProposal(taskId: number, id: number): Observable<Delete> {
        return this.http.delete<Delete>(`${this.apiUrl}/${taskId}/proposals/${id}`, httpOptions);
    }

    approveProposal(taskId: number, id: number): Observable<Order> {
        return this.http.post<Order>(`${this.apiUrl}/${taskId}/proposals/${id}/approve`,{}, httpOptions);
    }
}