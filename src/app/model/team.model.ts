import { User } from './user.model';

export class Team {
    id: number;
    name: string;
    user: User;
    creationDate: Date;
    modifiedDate: Date;
    userList: User[];
}