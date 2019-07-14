import {University} from './university.model';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    creationDate: string;
    imageUrl: string;
    university: University;
    privileges: { name: string }[];
}
