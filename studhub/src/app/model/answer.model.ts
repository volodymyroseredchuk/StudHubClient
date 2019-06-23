import { User } from './user.model';

export class Answer {
    id: number;
    body: string;
    approved: boolean;
    //comment: Comment[];
    user: User;
    
}