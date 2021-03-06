import { Tag } from './tag.model';
import { User } from './user.model';
import { Answer } from './answer.model';
import { Team } from './team.model';

export class Question {
    id: number;
    title: string;
    body: string;
    creationDate: Date;
    modifiedDate: Date;
    user: User;
    answerList: Answer[];
    tagList: Tag[];
    team: Team;
}