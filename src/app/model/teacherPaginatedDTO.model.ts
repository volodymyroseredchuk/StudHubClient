import {TeacherForListDTO} from './teacherForListDTO.model';

export class TeacherPaginatedDTO {
    teachers: TeacherForListDTO[];
    teachersTotalCount: number;
}
