import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BaseService } from './base-service';
import { Tag } from './../model/tag.model';
import { HttpClient } from '@angular/common/http';
import { TagsDTO } from '../model/tagsDTO.model';

@Injectable({
    providedIn: 'root'
  })
  export class TagService extends BaseService {
      
    constructor(protected http: HttpClient) {
        super(http);
        this.apiUrl += '/tags';
      }

    getTags(paginationSettings: string): Observable<TagsDTO> {
        return this.http.get<TagsDTO>(`${this.apiUrl}` + paginationSettings);
    }
  }