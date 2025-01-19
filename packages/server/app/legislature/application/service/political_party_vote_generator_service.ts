import { inject } from '@adonisjs/core';
import type Law from '#legislature/domain/models/law';
import type LawVoteResults from '#legislature/domain/models/law_vote_results';
import type { LegislatureType } from '#legislature/domain/models/legislature_type';
import type LawVotesPercentagePerPoliticalParty
  from '#legislature/domain/models/law_votes_percentage_per_political_party';
import GetPoliticalPartyOfGameQuery from '#political-party/application/queries/get_political_party_of_game_query';
import { aPoliticalPartyVoteForLaw } from '#legislature/application/builders/political_party_vote_for_law_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetPoliticalPartyOfGameQueryHandler
  from '#political-party/application/queries/i_get_political_party_of_game_query_handler';

@inject()
export default class PoliticalPartyVoteGeneratorService {
  constructor(
    private readonly getPoliticalPartyOfGameQueryHandler: IGetPoliticalPartyOfGameQueryHandler,
  ) {
  }

  public async generateVotesForPoliticalParties(law: Law, lawVoteResults: LawVoteResults, legislatureType: LegislatureType): Promise<void> {
    const createVotesForPoliticalPartiesPromises = [];
    for (const votePercentagePerPoliticalParty of law.percentagesOfVotesForPoliticalParty) {
      createVotesForPoliticalPartiesPromises.push(this.generateVotesForPoliticalParty(law.gameId, votePercentagePerPoliticalParty, lawVoteResults, legislatureType));
    }

    await Promise.all(createVotesForPoliticalPartiesPromises);
  }

  private async generateVotesForPoliticalParty(gameId: number, lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalParty, lawVoteResults: LawVoteResults, legislatureType: LegislatureType): Promise<void> {
    const politicalParty = await this.getPoliticalPartyOfGameQueryHandler.handleForVote(
      new GetPoliticalPartyOfGameQuery(gameId, lawVotesPercentagePerPoliticalParty.politicalPartyId),
    );

    await aPoliticalPartyVoteForLaw()
      .withPoliticalPartyId(politicalParty.id)
      .withLawVoteResultsId(lawVoteResults.id)
      .withVotesFor(politicalParty.getVotesInFavorOfLaw(lawVotesPercentagePerPoliticalParty, legislatureType))
      .withVotesAgainst(politicalParty.getVotesAgainstLaw(lawVotesPercentagePerPoliticalParty, legislatureType))
      .exist();
  }
}
