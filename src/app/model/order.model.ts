import { User } from './user.model';
import { Proposal } from './proposal.model';
import { Task } from './task.model';
import { ResultSubmission } from './result-submission.model';
import { FreelancerDTO } from './freelancerDTO.model';
import { CustomerDTO } from './customerDTO.model';


export class Order {
    id: number;
    userCreator: User;
    userExecutor: User;
    proposal: Proposal;
    task: Task;
    resultSubmission: ResultSubmission;
    startDate: Date;
    endDate: Date;
    freelancer: FreelancerDTO;
    customer: CustomerDTO;
}