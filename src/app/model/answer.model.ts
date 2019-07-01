import { User } from './user.model';
import { Vote } from './vote.model';

export class Answer {
    id: number;
    body: string;
    approved: boolean;
    comment: Comment[];
    user: User;
    vote: Vote;
    rate: number;
}