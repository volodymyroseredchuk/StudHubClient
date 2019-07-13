import {User} from './user.model';
import {University} from "./university.model";
import {Teacher} from "./teacher.model";
import {Vote} from "./vote.model";

export class Feedback {
    id: number;
    body: string;
    user: User;
    university: University;
    teacher: Teacher;
    mark: number;
    rate: number;
    vote: Vote;
}
