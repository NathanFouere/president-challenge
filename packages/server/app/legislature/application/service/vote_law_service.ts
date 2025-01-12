import * as console from 'node:console';
import { inject } from '@adonisjs/core';
import type Law from '#legislature/domain/models/law';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IPoliticalPartyRepository from '#political-party/domain/repository/i_political_party_repository';
import GetPoliticalPartyOfGameQuery from '#political-party/application/queries/get_political_party_of_game_query';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GetPoliticalPartyOfGameQueryHandler
  from '#political-party/infrastructure/query/get_political_party_of_game_query_handler';
import type LawVotesPercentagePerPoliticalParty
  from '#legislature/domain/models/law_votes_percentage_per_political_party';

@inject()
export default class VoteLawService {
  constructor(
    private readonly politicalPartyRepository: IPoliticalPartyRepository,
    private readonly getPoliticalPartyOfGameQueryHandler: GetPoliticalPartyOfGameQueryHandler,
  ) {
  }

  /*
  * doit voter la loi
  * doit renvoyer un format avec les charts de vote
  */
  public async voteLaw(law: Law): void {
    await this.getPoliticalPartiesVotes(law);
  }

  private async getPoliticalPartiesVotes(law: Law): Promise<void> {
    for (const votePercentagePerPoliticalParty of law.votesPercentagePerPoliticalParties) {
      const votes = await this.getVotesForPoliticalParty(law.gameId, votePercentagePerPoliticalParty);
      console.log(votes);
    }
  }

  private async getVotesForPoliticalParty(gameId: number, lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalParty): Promise<number> {
    const politicalParty = await this.getPoliticalPartyOfGameQueryHandler.handleForVote(
      new GetPoliticalPartyOfGameQuery(gameId, lawVotesPercentagePerPoliticalParty.politicalPartyId),
    );
    console.log(politicalParty.senateSeats);
    return politicalParty.senateSeats.numberOfSeats * lawVotesPercentagePerPoliticalParty.percentageVoteFor;
  }
}
