import { User } from './user.model';
import { Proposal } from './proposal.model';
import { Task } from './task.model';
import { ResultSubmission } from './result-submission.model';


export class Order {
    id: number;
    userCreator: User;
    userExecutor: User;
    proposal: Proposal;
    task: Task;
    resultSubmission: ResultSubmission;
    startDate: Date;
    endDate: Date;
}