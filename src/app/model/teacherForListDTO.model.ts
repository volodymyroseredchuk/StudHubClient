import {University} from './university.model';

export class TeacherDTO {
    id: number;
    firstName: string;
    lastName: string;
    imageUrl: string;
    university: University;
    mark: number;
}
