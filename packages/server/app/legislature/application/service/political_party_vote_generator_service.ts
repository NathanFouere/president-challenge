import { inject } from '@adonisjs/core';
import type LawVoteResults from '#law/domain/model/law_vote_results';
import type { LegislatureType } from '#legislature/domain/models/legislature_type';
import type LawVotesPercentagePerPoliticalAffiliation
  from '#law/domain/model/law_votes_percentage_per_political_affiliation';
import { aPoliticalPartyVoteForLaw } from '#legislature/application/builders/political_party_vote_for_law_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IPoliticalPartyVoteForLawRepository,
} from '#legislature/domain/repository/i_political_party_vote_for_law_repository';
import type PoliticalPartyVoteForLaw from '#legislature/domain/models/political_party_vote_for_law';
import type Law from '#law/domain/model/law';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IGetPoliticalPartyPerAffiliationInGameQueryHandler,
} from '#political-party/application/queries/i_get_political_party_per_affiliation_in_game_query_handler';
import GetPoliticalPartyPerAffiliationInGameQuery
  from '#political-party/application/queries/get_political_party_per_affiliation_in_game_query';

@inject()
export default class PoliticalPartyVoteGeneratorService {
  constructor(
    private readonly politicalPartyVotesForLawRepository: IPoliticalPartyVoteForLawRepository,
    private readonly getPoliticalPartyPerAffiliationInGameQueryHandler: IGetPoliticalPartyPerAffiliationInGameQueryHandler,
  ) {
  }

  public async generateVotesForPoliticalParties(law: Law, lawVoteResults: LawVoteResults, legislatureType: LegislatureType): Promise<PoliticalPartyVoteForLaw[]> {
    const politicalPartyVotesForLawPromises = [];
    for (const votePercentagePerPoliticalParty of law.definition.percentagesOfVotesForPoliticalParty) {
      politicalPartyVotesForLawPromises.push(this.generateVotesForPoliticalParty(votePercentagePerPoliticalParty, lawVoteResults, legislatureType, law.gameId));
    }

    const politicalPartyVotesForLaw = await Promise.all(politicalPartyVotesForLawPromises);

    await this.politicalPartyVotesForLawRepository.createMany(politicalPartyVotesForLaw);

    return politicalPartyVotesForLaw;
  }

  private async generateVotesForPoliticalParty(lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalAffiliation, lawVoteResults: LawVoteResults, legislatureType: LegislatureType, gameId: number): Promise<PoliticalPartyVoteForLaw> {
    const politicalParty = await this.getPoliticalPartyPerAffiliationInGameQueryHandler.handleForVote(
      new GetPoliticalPartyPerAffiliationInGameQuery(gameId, lawVotesPercentagePerPoliticalParty.politicalAffiliation),
    );
    return aPoliticalPartyVoteForLaw()
      .withPoliticalPartyId(politicalParty.id)
      .withLawVoteResultsId(lawVoteResults.id)
      .withVotesFor(politicalParty.getVotesInFavorOfLaw(lawVotesPercentagePerPoliticalParty, legislatureType))
      .withVotesAgainst(politicalParty.getVotesAgainstLaw(lawVotesPercentagePerPoliticalParty, legislatureType))
      .build();
  }
}
