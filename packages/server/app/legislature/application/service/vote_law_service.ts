import { inject } from '@adonisjs/core';
import type Law from '#legislature/domain/models/law';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawRepository from '#legislature/domain/repository/i_law_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawVoteGeneratorService from '#legislature/application/service/law_vote_generator_service';
import type LawGroup from '#legislature/domain/models/law_group';
import DuplicateLawVoteForTurnError from '#legislature/application/error/duplicate_law_vote_for_turn_error';

@inject()
export default class VoteLawService {
  constructor(
    private readonly lawRepository: ILawRepository,
    private readonly lawVoteGeneratorService: LawVoteGeneratorService,
  ) {
  }

  public async voteLaw(law: Law, turn: number): Promise<void> {
    try {
      if (law.voted) {
        throw new Error('Law already voted');
      }

      const lawVote = await this.lawVoteGeneratorService.generateLawVote(law, turn);

      if (lawVote.votePassed) {
        law.voted = true;
        await this.unvoteIncompatibleLaws(law.lawGroup);

        await this.lawRepository.save(law);
      }
    }
    catch (error) {
      if (error.code === '23505') {
        throw new DuplicateLawVoteForTurnError(law.id, turn);
      }
      throw error;
    }
  }

  public async unvoteIncompatibleLaws(lawGroup: LawGroup): Promise<void> {
    for (const law of lawGroup.laws) {
      if (law.voted) {
        law.voted = false;
      }
    }
    await this.lawRepository.saveMany(lawGroup.laws);
  }
}
