import { inject } from '@adonisjs/core';
import type Law from '#legislature/domain/models/law';
import { aLawVote } from '#legislature/application/builders/law_vote_builder';
import type LawVote from '#legislature/domain/models/law_vote';
import { GetLawVoteQuery } from '#legislature/application/query/get_law_vote_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetLawVoteQueryHandler from '#legislature/application/query/i_get_law_vote_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawVoteRepository from '#legislature/infrastructure/repositories/law_vote_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import VoteResultGeneratorService from '#legislature/application/service/vote_result_generator_service';

@inject()
export default class LawVoteGeneratorService {
  constructor(
    private readonly getLawVoteQueryHandler: IGetLawVoteQueryHandler,
    private readonly lawVoteRepository: LawVoteRepository,
    private readonly voteResultGeneratorService: VoteResultGeneratorService,
  ) {
  }

  public async generateLawVote(law: Law, turn: number): Promise<LawVote> {
    const lawVote = await aLawVote()
      .withTurn(turn)
      .withLawId(law.id)
      .exist();

    await this.voteResultGeneratorService.generateAllVoteResults(law, lawVote);
    await this.uptadeLawVote(lawVote);

    return lawVote;
  }

  private async uptadeLawVote(lawVote: LawVote): Promise<void> {
    const updatedLawVote = await this.getLawVoteQueryHandler.handle(new GetLawVoteQuery(
      lawVote.id,
      lawVote.lawId,
    ));

    const votePasses = this.getIfVotePassed(updatedLawVote);
    if (votePasses) {
      updatedLawVote.votePassed = true;
      await this.lawVoteRepository.save(updatedLawVote);
    }
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
}
