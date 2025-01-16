import type { MinimalLawDto } from '@shared/legislature/minimal-law-dto.js';
import type { ChartDataDTO } from '@shared/chart/ChartDataDTO.js';

export interface LawDto extends MinimalLawDto {
  id: number;
  name: string;
  description: string;
  voted: boolean;
  lastVoteResultsDatas: VoteResultsDatas | null;
}

export interface VoteResultsDatas {
  votesInParliament: ChartDataDTO;
  votesInSenate: ChartDataDTO;
  turnOfVotes: number;
}
