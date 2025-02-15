import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ILawRepository from '#law/domain/repository/i_law_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawVoteGeneratorService from '#law/application/service/law_vote_generator_service';
import DuplicateLawVoteForTurnError from '#law/application/error/duplicate_law_vote_for_turn_error';
import type Game from '#game/domain/models/game';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGameRepository from '#game/domain/repository/i_game_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ApplyLawEffectService from '#law/application/service/law-effect/apply_law_effect_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import UnvoteLawService from '#law/application/service/unvote_law_service';
import type Law from '#law/domain/model/law';

@inject()
export default class VoteLawService {
  constructor(
    private readonly lawRepository: ILawRepository,
    private readonly lawVoteGeneratorService: LawVoteGeneratorService,
    private readonly gameRepository: IGameRepository,
    private readonly applyLawEffectService: ApplyLawEffectService,
    private readonly unvoteLawService: UnvoteLawService,
  ) {
  }

  public async voteLaw(law: Law, game: Game): Promise<void> {
    if (law.isVoted()) {
      throw new Error('Law already voted');
    }
    else if (law.definition.politicalWeightRequired > game.politicalWeight) {
      throw new Error('Political weight required to vote is not enough');
    }

    try {
      const lawVote = await this.lawVoteGeneratorService.generateLawVote(law, game.turn);

      if (lawVote.votePassed) {
        law.setVoted();
        game.updatePoliticalWeight(-law.definition.politicalWeightRequired);

        await this.applyLawEffectService.applyLawEffect(law, game.id);
        await this.unvoteLawService.unvoteIncompatibleLawsOfLaw(law, game.id);
        await this.gameRepository.save(game);
        await this.lawRepository.save(law);
      }
    }
    catch (error) {
      if (error.code === DuplicateLawVoteForTurnError.code) {
        throw new DuplicateLawVoteForTurnError(law.id, game.turn);
      }
      throw error;
    }
  }
}
