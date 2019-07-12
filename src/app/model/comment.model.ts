import { User } from './user.model';
import { Answer } from './answer.model';

export class Comment{
    id: number;
    body: string; 
    creationDate: Date;
    modifiedDate: Date;
    answer: Answer;      
    user: User;
}