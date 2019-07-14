import { NewsForListDTO } from './newsForListDTO.model';

export class NewsPaginatedDTO {
    news: NewsForListDTO[];
    newsTotalCount: number;
}