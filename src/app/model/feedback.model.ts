import {Vote} from './vote.model';

export class Feedback {
    body: string;
    universityId: number;
    teacherId: number;
    mark: number;
    rate: number;
    vote: Vote;
}
