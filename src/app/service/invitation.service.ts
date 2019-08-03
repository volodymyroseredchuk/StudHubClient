import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base-service';
import { Observable } from 'rxjs';
import { TeamPaginatedDTO } from '../model/teamPaginatedDTO.model';
import { Team } from '../model/team.model';
import { Delete } from '../model/delete.model';
import { Invitation } from '../model/invitation.model';

@Injectable({
    providedIn: 'root'
})
export class InvitationService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/teams';
    }

    getInvitation(teamId: number): Observable<Invitation[]> {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('accessToken')}`
            })
        }
        return this.http.get<Invitation[]>(`${this.apiUrl}/${teamId}/invitations`, httpOptions);
    }
    
    acceptInvitation(teamId: number, invitationId: number, team: Team): Observable<Team> {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('accessToken')}`
            })
        }
        return this.http.put<Team>(`${this.apiUrl}/${teamId}/invitations/${invitationId}`, team, httpOptions);
    }

    deleteInvitation(teamId: number, invitationId: number): Observable<Delete> {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('accessToken')}`
            })
        }
        return this.http.delete<Delete>(`${this.apiUrl}/${teamId}/invitations/${invitationId}`, httpOptions);
    }

}