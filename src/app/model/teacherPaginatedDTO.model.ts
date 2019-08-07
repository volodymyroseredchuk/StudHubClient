import {TeacherDTO} from './teacherForListDTO.model';

export class TeacherPaginatedDTO {
    teachers: TeacherDTO[];
    teachersTotalCount: number;
}
