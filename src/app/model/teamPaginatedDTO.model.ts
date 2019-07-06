import { Team } from './team.model';

export class TeamPaginatedDTO {
    teams: Team[];
    teamsTotalCount: number;
}