import { Proposal } from './proposal.model';

export class ProposalPaginatedDTO {
    proposals: Proposal[];
    proposalsTotalCount: number;
}