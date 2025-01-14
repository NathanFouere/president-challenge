import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IPoliticalPartyVoteForLawRepository,
} from '#legislature/domain/repository/i_political_party_vote_for_law_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetPoliticalPartyOfGameQueryHandler
  from '#political-party/application/queries/i_get_political_party_of_game_query_handler';
import type Law from '#legislature/domain/models/law';
import { aLawVoteResult } from '#legislature/application/builders/law_vote_results_builder';
import type LawVoteResults from '#legislature/domain/models/law_vote_results';
import type LawVotesPercentagePerPoliticalParty
  from '#legislature/domain/models/law_votes_percentage_per_political_party';
import type PoliticalPartyVoteForLaw from '#legislature/domain/models/political_party_vote_for_law';
import GetPoliticalPartyOfGameQuery from '#political-party/application/queries/get_political_party_of_game_query';
import { aPoliticalPartyVoteForLaw } from '#legislature/application/builders/political_party_vote_for_law_builder';
import type PoliticalParty from '#political-party/domain/models/political_party';
import type { LegislatureType } from '#legislature/domain/models/legislature_type';

@inject()
export default class GenerateVoteResultsService {
  constructor(
    private readonly partyVoteForLawRepository: IPoliticalPartyVoteForLawRepository,
    private readonly getPoliticalPartyOfGameQueryHandler: IGetPoliticalPartyOfGameQueryHandler,
  ) {
  }

  public async generateVoteResults(law: Law, turn: number, legislatureType: LegislatureType): Promise<void> {
    const lawVoteResults = await aLawVoteResult()
      .withTurn(turn)
      .withLawId(law.id)
      .withLegislatureType(legislatureType)
      .exist();

    await this.getPoliticalPartiesVotes(law, lawVoteResults);
  }

  private async getPoliticalPartiesVotes(law: Law, lawVoteResults: LawVoteResults): Promise<void> {
    const getVotesForPoliticalParties = [];
    for (const votePercentagePerPoliticalParty of law.percentagesOfVotesForPoliticalParty) {
      getVotesForPoliticalParties.push(await this.getVotesForPoliticalParty(law.gameId, votePercentagePerPoliticalParty, lawVoteResults));
    }

    await this.partyVoteForLawRepository.createMany(getVotesForPoliticalParties);
  }

  private async getVotesForPoliticalParty(gameId: number, lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalParty, lawVoteResults: LawVoteResults): Promise<PoliticalPartyVoteForLaw> {
    const politicalParty = await this.getPoliticalPartyOfGameQueryHandler.handleForVote(
      new GetPoliticalPartyOfGameQuery(gameId, lawVotesPercentagePerPoliticalParty.politicalPartyId),
    );

    return aPoliticalPartyVoteForLaw()
      .withPoliticalPartyId(politicalParty.id)
      .withLawVoteResultsId(lawVoteResults.id)
      .withVotesFor(this.getVotesFor(lawVotesPercentagePerPoliticalParty, politicalParty))
      .withVotesAgainst(this.getVotesAgainst(lawVotesPercentagePerPoliticalParty, politicalParty))
      .build();
  }

  // TODO => bouger ça dans entité
  private getVotesFor(lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalParty, politicalParty: PoliticalParty): number {
    return politicalParty.senateSeats.numberOfSeats * (lawVotesPercentagePerPoliticalParty.percentage / 100);
  }

  private getVotesAgainst(lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalParty, politicalParty: PoliticalParty): number {
    return politicalParty.senateSeats.numberOfSeats * ((100 - lawVotesPercentagePerPoliticalParty.percentage) / 100);
  }
}
