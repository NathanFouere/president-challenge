import { inject } from '@adonisjs/core';
import type Law from '#legislature/domain/models/law';
import type LawVoteResults from '#legislature/domain/models/law_vote_results';
import type { LegislatureType } from '#legislature/domain/models/legislature_type';
import type LawVotesPercentagePerPoliticalParty
  from '#legislature/domain/models/law_votes_percentage_per_political_party';
import { aPoliticalPartyVoteForLaw } from '#legislature/application/builders/political_party_vote_for_law_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  IPoliticalPartyVoteForLawRepository,
} from '#legislature/domain/repository/i_political_party_vote_for_law_repository';
import type PoliticalPartyVoteForLaw from '#legislature/domain/models/political_party_vote_for_law';

@inject()
export default class PoliticalPartyVoteGeneratorService {
  constructor(
    private readonly politicalPartyVotesForLawRepository: IPoliticalPartyVoteForLawRepository,
  ) {
  }

  public async generateVotesForPoliticalParties(law: Law, lawVoteResults: LawVoteResults, legislatureType: LegislatureType): Promise<PoliticalPartyVoteForLaw[]> {
    const politicalPartyVotesForLaw = [];
    for (const votePercentagePerPoliticalParty of law.percentagesOfVotesForPoliticalParty) {
      politicalPartyVotesForLaw.push(this.generateVotesForPoliticalParty(votePercentagePerPoliticalParty, lawVoteResults, legislatureType));
    }

    await this.politicalPartyVotesForLawRepository.createMany(politicalPartyVotesForLaw);

    return politicalPartyVotesForLaw;
  }

  private generateVotesForPoliticalParty(lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalParty, lawVoteResults: LawVoteResults, legislatureType: LegislatureType): PoliticalPartyVoteForLaw {
    return aPoliticalPartyVoteForLaw()
      .withPoliticalPartyId(lawVotesPercentagePerPoliticalParty.politicalPartyId)
      .withLawVoteResultsId(lawVoteResults.id)
      .withVotesFor(lawVotesPercentagePerPoliticalParty.politicalParty.getVotesInFavorOfLaw(lawVotesPercentagePerPoliticalParty, legislatureType))
      .withVotesAgainst(lawVotesPercentagePerPoliticalParty.politicalParty.getVotesAgainstLaw(lawVotesPercentagePerPoliticalParty, legislatureType))
      .build();
  }
}
