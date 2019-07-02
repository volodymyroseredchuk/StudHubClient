import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseService} from './base-service';
import {University} from '../model/university.model';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UniversityService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  getAllUniversities(): Observable<University[]> {
    return this.http.get<University[]>(`${this.apiUrl}/universities`);
  }


}

