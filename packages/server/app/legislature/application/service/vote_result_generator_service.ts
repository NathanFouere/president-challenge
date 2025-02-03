import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import PoliticalPartyVoteGeneratorService
  from '#legislature/application/service/political_party_vote_generator_service';
import type Law from '#legislature/domain/models/law';
import type LawVote from '#legislature/domain/models/law_vote';
import { LegislatureType } from '#legislature/domain/models/legislature_type';
import { aLawVoteResult } from '#legislature/application/builders/law_vote_results_builder';
import type LawVoteResults from '#legislature/domain/models/law_vote_results';

@inject()
export default class VoteResultGeneratorService {
  constructor(
    private readonly politicalPartyVoteGeneratorService: PoliticalPartyVoteGeneratorService) {
  }

  public async generateAllVoteResults(law: Law, lawVote: LawVote): Promise<void> {
    const voteResultsInParliament = await this.generateVoteResults(law, lawVote, LegislatureType.PARLIAMENT);
    const voteResultsInSenate = await this.generateVoteResults(law, lawVote, LegislatureType.SENATE);
    lawVote.setVoteResultsInSenate(voteResultsInSenate);
    lawVote.setVoteResultsInParliament(voteResultsInParliament);
  }

  private async generateVoteResults(law: Law, lawVote: LawVote, legislatureType: LegislatureType): Promise<LawVoteResults> {
    const lawVoteResults = await aLawVoteResult()
      .withLawVoteId(lawVote.id)
      .withLegislatureType(legislatureType)
      .exist();

    lawVoteResults.politicalPartiesVoteResults.push(
      ...await this.politicalPartyVoteGeneratorService.generateVotesForPoliticalParties(law, lawVoteResults, legislatureType),
    );

    return lawVoteResults;
  }
}
