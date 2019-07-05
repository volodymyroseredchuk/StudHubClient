import { User } from './user.model';

export class Task {
    id: number;
    title: string;
    body: string;
    creationDate: Date;
    modifiedDate: Date;
    deadlineDate: Date;
    expectedPrice: number;
    user: User;
}