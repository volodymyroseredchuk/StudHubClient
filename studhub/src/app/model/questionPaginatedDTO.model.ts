import { QuestionForListDTO } from './questionForListDTO.model';

export class QuestionPaginatedDTO {
    questions: QuestionForListDTO[];
    questionsTotalCount: number;
}