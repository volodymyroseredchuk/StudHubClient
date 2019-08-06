import { UserDTO } from './userDTO.model';
import { Team } from './team.model';

export class Invitation {
    id: number;
    user: UserDTO;
    team: Team;
}