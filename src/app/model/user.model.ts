import { University } from './university.model';
import { Feed } from './feed.model';

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
    emailSubscription: boolean;
    roles: { name: string }[];
    privileges: { name: string }[];
    feeds: Feed[];
}
