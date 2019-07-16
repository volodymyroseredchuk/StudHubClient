import { Tag } from './tag.model';
import { Team } from './team.model';
import { User } from './user.model';

export class QuestionForListDTO {
    id: number;
    title: string;
    creationDate: Date;
    modifiedDate: Date;
    user: User;
    tagList: Tag[];
}