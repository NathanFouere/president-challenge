import type { LawDto, VoteResultsData } from '@president-challenge/shared/dist/legislature/law-dto.js';
import { inject } from '@adonisjs/core';
import type { ChartDataDTO } from '@president-challenge/shared/dist/chart/ChartDataDTO.js';
import type { DatasetDTO } from '@president-challenge/shared/dist/chart/DatasetDTO.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import MinimalLawDtoFactory from '#law/application/dto-factory/minimal_law_dto_factory';
import type LawVoteResults from '#law/domain/model/law_vote_results';
import type LawVote from '#law/domain/model/law_vote';
import type Game from '#game/domain/models/game';
import type Law from '#law/domain/model/law';

@inject()
export default class LawDtoFactory {
  constructor(
    private readonly minimalLawDtoFactory: MinimalLawDtoFactory,
  ) {
  }

  public createFromLaw(law: Law, game: Game): LawDto {
    const voteResultsDatas: VoteResultsData[] = [];
    for (const lawVote of law.votes) {
      voteResultsDatas.push({
        votesInParliament: this.createVoteResultsChartData(lawVote.voteResultsInParliament),
        votesInSenate: this.createVoteResultsChartData(lawVote.voteResultsInSenate),
        turnOfVotes: lawVote.turn,
        votePassed: lawVote.votePassed,
      });
    }

    return {
      ...this.minimalLawDtoFactory.createFromLaw(law),
      madeIncompatibleBy: 'ttooto',
      voteResultsDatas: voteResultsDatas,
      alreadyVotedForThisTurn: law.votes.some((lawVote: LawVote) => lawVote.turn === game.turn),
      superiorToAvailablePoliticalWeight: law.definition.politicalWeightRequired > game.politicalWeight,
    };
  }

  private createVoteResultsChartData(lawVoteResultFor: LawVoteResults): ChartDataDTO {
    const labels: string[] = [];
    const datasets: DatasetDTO[] = [];

    labels.push('Votes for', 'Votes against');
    for (const voteResult of lawVoteResultFor.politicalPartiesVoteResults) {
      datasets.push({
        label: voteResult.politicalParty.definition.name,
        data: [voteResult.votesFor, voteResult.votesAgainst],
        backgroundColor: [voteResult.politicalParty.definition.color],
        borderColor: [voteResult.politicalParty.definition.color],
      });
    }
    return {
      title: 'Vote Results',
      labels,
      datasets: datasets,
    };
  }
}
