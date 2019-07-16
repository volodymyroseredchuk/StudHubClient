import { Task } from './task.model';

export class TaskPaginatedDTO {
    tasks: Task[];
    tasksTotalCount: number;
}