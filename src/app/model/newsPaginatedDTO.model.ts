import { NewsForListDTO } from './newsForListDTO.model';

export class NewsPaginatedDTO {
    newsList: NewsForListDTO[][];
    newsTotalCount: number;
}