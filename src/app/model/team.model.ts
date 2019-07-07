import { UserDTO } from './userDTO.model';

export class Team {
    id: number;
    title: string;
    user: UserDTO;
    creationDate: Date;
    modifiedDate: Date;
    userList: UserDTO[];
}