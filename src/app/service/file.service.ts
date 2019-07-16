
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base-service';
import { Delete } from '../model/delete.model';

@Injectable({ providedIn: 'root' })
export class FileService extends BaseService {

    constructor(protected http: HttpClient) {
        super(http);
    }

    uploadFile(file: File) {
        let input = new FormData();
        input.append('multipartFile', file);

        return this.http.post<Delete>(`${this.apiUrl}/files/upload`, input);
    }
}

