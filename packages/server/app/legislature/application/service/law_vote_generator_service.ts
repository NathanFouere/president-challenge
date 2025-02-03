import { inject } from '@adonisjs/core';
import type Law from '#legislature/domain/models/law';
import { aLawVote } from '#legislature/application/builders/law_vote_builder';
import type LawVote from '#legislature/domain/models/law_vote';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawVoteRepository from '#legislature/infrastructure/repositories/law_vote_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import VoteResultGeneratorService from '#legislature/application/service/vote_result_generator_service';

@inject()
export default class LawVoteGeneratorService {
  constructor(
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

    lawVote.processVotePassed();
    await this.lawVoteRepository.save(lawVote);

    return lawVote;
  }
}
