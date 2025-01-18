import type { LawDto, VoteResultsData } from '@shared/dist/legislature/law-dto.js';
import { inject } from '@adonisjs/core';
import type { ChartDataDTO } from '@shared/dist/chart/ChartDataDTO.js';
import type { DatasetDTO } from '@shared/dist/chart/DatasetDTO.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import MinimalLawDtoFactory from '#legislature/application/dto-factories/minimal_law_dto_factory';
import type Law from '#legislature/domain/models/law';
import type LawVoteResults from '#legislature/domain/models/law_vote_results';
import type LawVote from '#legislature/domain/models/law_vote';

@inject()
export default class LawDtoFactory {
  constructor(
    private readonly minimalLawDtoFactory: MinimalLawDtoFactory,
  ) {
  }

  public createFromLaw(law: Law, turn: number): LawDto {
    const voteResultsDatas: VoteResultsData[] = [];
    for (const lawVote of law.lawVotes) {
      voteResultsDatas.push({
        votesInParliament: this.createVoteResultsChartData(lawVote.voteResultsInParliament),
        votesInSenate: this.createVoteResultsChartData(lawVote.voteResultsInSenate),
        turnOfVotes: lawVote.turn,
        votePassed: lawVote.votePassed,
      });
    }
    return {
      ...this.minimalLawDtoFactory.createFromLaw(law),
      madeIncompatibleBy: law.lawGroup.laws.find((law: Law) => law.voted)?.name,
      voteResultsDatas: voteResultsDatas,
      canVoteForThisTurn: law.lawVotes.every((lawVote: LawVote) => lawVote.turn != turn),
    };
  }

  private createVoteResultsChartData(lawVoteResultFor: LawVoteResults): ChartDataDTO {
    const labels: string[] = [];
    const datasets: DatasetDTO[] = [];

    labels.push('Votes for', 'Votes against');
    for (const voteResult of lawVoteResultFor.politicalPartiesVoteResults) {
      datasets.push({
        label: voteResult.politicalParty.name,
        data: [voteResult.votesFor, voteResult.votesAgainst],
        backgroundColor: [voteResult.politicalParty.color],
        borderColor: [voteResult.politicalParty.color],
      });
    }
    return {
      title: 'Vote Results',
      labels,
      datasets: datasets,
    };
  }
}
