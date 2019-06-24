import { Tag } from './tag.model';
import { User } from './user.model';
import { Answer } from './answer.model';
import {University} from "./university.model";
import {Teacher} from "./teacher.model";

export class Feedback {
    id: number;
    body: string;
    user: User;
    university: University;
    teacher: Teacher;
    mark: number;
    rate: number;
}