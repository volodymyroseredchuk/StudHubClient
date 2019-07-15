import { User } from './user.model';

 export class Proposal {
    id: number;
    body: string;
    price: number;
    daysCount: number;
    creationDate: Date;
    user: User;
}