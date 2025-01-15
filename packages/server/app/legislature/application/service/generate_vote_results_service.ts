import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetPoliticalPartyOfGameQueryHandler
  from '#political-party/application/queries/i_get_political_party_of_game_query_handler';
import type Law from '#legislature/domain/models/law';
import { aLawVoteResult } from '#legislature/application/builders/law_vote_results_builder';
import type LawVoteResults from '#legislature/domain/models/law_vote_results';
import type LawVotesPercentagePerPoliticalParty
  from '#legislature/domain/models/law_votes_percentage_per_political_party';
import GetPoliticalPartyOfGameQuery from '#political-party/application/queries/get_political_party_of_game_query';
import { aPoliticalPartyVoteForLaw } from '#legislature/application/builders/political_party_vote_for_law_builder';
import type { LegislatureType } from '#legislature/domain/models/legislature_type';

@inject()
export default class GenerateVoteResultsService {
  constructor(
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
    const createVotesForPoliticalPartiesPromises = [];
    for (const votePercentagePerPoliticalParty of law.percentagesOfVotesForPoliticalParty) {
      createVotesForPoliticalPartiesPromises.push(this.createVotesForPoliticalParty(law.gameId, votePercentagePerPoliticalParty, lawVoteResults));
    }

    await Promise.all(createVotesForPoliticalPartiesPromises);
  }

  private async createVotesForPoliticalParty(gameId: number, lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalParty, lawVoteResults: LawVoteResults): Promise<void> {
    const politicalParty = await this.getPoliticalPartyOfGameQueryHandler.handleForVote(
      new GetPoliticalPartyOfGameQuery(gameId, lawVotesPercentagePerPoliticalParty.politicalPartyId),
    );

    await aPoliticalPartyVoteForLaw()
      .withPoliticalPartyId(politicalParty.id)
      .withLawVoteResultsId(lawVoteResults.id)
      .withVotesFor(politicalParty.getVotesInFavorOfLaw(lawVotesPercentagePerPoliticalParty))
      .withVotesAgainst(politicalParty.getVotesAgainstLaw(lawVotesPercentagePerPoliticalParty))
      .exist();
  }
}
