import { inject } from '@adonisjs/core';
import type Law from '#law/domain/model/law';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawRepository from '#law/domain/repository/i_law_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawVoteGeneratorService from '#law/application/service/law_vote_generator_service';
import type LawGroup from '#law/domain/model/law_group';
import DuplicateLawVoteForTurnError from '#law/application/error/duplicate_law_vote_for_turn_error';
import type Game from '#game/domain/models/game';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGameRepository from '#game/domain/repository/i_game_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ApplyLawEffectService from '#law/application/service/law-effect/apply_law_effect_service';

@inject()
export default class VoteLawService {
  constructor(
    private readonly lawRepository: ILawRepository,
    private readonly lawVoteGeneratorService: LawVoteGeneratorService,
    private readonly gameRepository: IGameRepository,
    private readonly applyLawEffectService: ApplyLawEffectService,
  ) {
  }

  public async voteLaw(law: Law, game: Game): Promise<void> {
    try {
      if (law.isVoted()) {
        throw new Error('Law already voted');
      }
      else if (law.politicalWeightRequired > game.politicalWeight) {
        throw new Error('Political weight required to vote is not enough');
      }

      const lawVote = await this.lawVoteGeneratorService.generateLawVote(law, game.turn);

      if (lawVote.votePassed) {
        law.setVoted();
        game.updatePoliticalWeight(-law.politicalWeightRequired);

        await this.applyLawEffectService.applyLawEffect(law.lawEffect, game.id);
        await this.gameRepository.save(game);
        await this.unvoteIncompatibleLaws(law.lawGroup);
        await this.lawRepository.save(law);
      }
    }
    catch (error) {
      if (error.code === '23505') {
        throw new DuplicateLawVoteForTurnError(law.id, game.turn);
      }
      throw error;
    }
  }

  public async unvoteIncompatibleLaws(lawGroup: LawGroup): Promise<void> {
    for (const law of lawGroup.laws) {
      if (law.voted) {
        law.setUnvoted();
      }
    }
    await this.lawRepository.saveMany(lawGroup.laws);
  }
}
