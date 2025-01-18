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
import { LegislatureType } from '#legislature/domain/models/legislature_type';
import { aLawVote } from '#legislature/application/builders/law_vote_builder';
import type LawVote from '#legislature/domain/models/law_vote';
import { GetLawVoteQuery } from '#legislature/application/query/get_law_vote_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetLawVoteQueryHandler from '#legislature/application/query/i_get_law_vote_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawVoteRepository from '#legislature/infrastructure/repositories/law_vote_repository';

@inject()
export default class LawVoteGeneratorService {
  constructor(
    private readonly getPoliticalPartyOfGameQueryHandler: IGetPoliticalPartyOfGameQueryHandler,
    private readonly getLawVoteQueryHandler: IGetLawVoteQueryHandler,
    private readonly lawVoteRepository: LawVoteRepository,
  ) {
  }

  public async generateLawVote(law: Law, turn: number): Promise<LawVote> {
    const lawVote = await aLawVote()
      .withTurn(turn)
      .withLawId(law.id)
      .exist();

    await this.generateVoteResults(law, lawVote, LegislatureType.PARLIAMENT);
    await this.generateVoteResults(law, lawVote, LegislatureType.SENATE);

    const updatedLawVote = await this.getLawVoteQueryHandler.handle(new GetLawVoteQuery(
      lawVote.id,
      law.id,
    ));

    const votePasses = this.getIfVotePassed(updatedLawVote);
    if (votePasses) {
      updatedLawVote.votePassed = true;
      await this.lawVoteRepository.save(updatedLawVote);
    }

    return updatedLawVote;
  }

  private getIfVotePassed(lawVote: LawVote): boolean {
    const lawPassedInParliament = lawVote.voteResultsInParliament.politicalPartiesVoteResults.every((politicalPartyVoteResults) => {
      return politicalPartyVoteResults.votesFor > politicalPartyVoteResults.votesAgainst;
    });

    const lawPassedInSenate = lawVote.voteResultsInSenate.politicalPartiesVoteResults.every((politicalPartyVoteResults) => {
      return politicalPartyVoteResults.votesFor > politicalPartyVoteResults.votesAgainst;
    });

    return lawPassedInParliament && lawPassedInSenate;
  }

  private async generateVoteResults(law: Law, lawVote: LawVote, legislatureType: LegislatureType): Promise<void> {
    const lawVoteResults = await aLawVoteResult()
      .withLawVoteId(lawVote.id)
      .withLegislatureType(legislatureType)
      .exist();

    await this.getPoliticalPartiesVotes(law, lawVoteResults, legislatureType);
  }

  private async getPoliticalPartiesVotes(law: Law, lawVoteResults: LawVoteResults, legislatureType: LegislatureType): Promise<void> {
    const createVotesForPoliticalPartiesPromises = [];
    for (const votePercentagePerPoliticalParty of law.percentagesOfVotesForPoliticalParty) {
      createVotesForPoliticalPartiesPromises.push(this.createVotesForPoliticalParty(law.gameId, votePercentagePerPoliticalParty, lawVoteResults, legislatureType));
    }

    await Promise.all(createVotesForPoliticalPartiesPromises);
  }

  private async createVotesForPoliticalParty(gameId: number, lawVotesPercentagePerPoliticalParty: LawVotesPercentagePerPoliticalParty, lawVoteResults: LawVoteResults, legislatureType: LegislatureType): Promise<void> {
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
