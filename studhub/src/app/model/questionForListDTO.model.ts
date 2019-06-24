import { Tag } from './tag.model';

export class QuestionForListDTO {
    id: number;
    title: string;
    creationDate: Date;
    tagList: Tag[];
}