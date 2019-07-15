import { User } from './user.model';
import { Tag } from './tag.model';

export class Task {
    id: number;
    title: string;
    body: string;
    creationDate: Date;
    modifiedDate: Date;
    deadlineDate: Date;
    expectedPrice: number;
    user: User;
    status: string;
    tagList: Tag[];
}