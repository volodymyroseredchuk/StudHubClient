import { UserDTO } from './userDTO.model';
import { Invitation } from './invitation.model';

export class Team {
    id: number;
    title: string;
    description: string;
    user: UserDTO;
    creationDate: Date;
    modifiedDate: Date;
    userList: UserDTO[];
    isPublic: boolean;
    invitations: Invitation[];
}