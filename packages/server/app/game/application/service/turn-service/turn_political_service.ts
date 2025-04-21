import { inject } from '@adonisjs/core';
import type { GameTurnProcessStreamData } from '@president-challenge/shared/dist/game/game-turn-process-stream-data.js';

import { TurnProcessorStep } from '#game/application/service/turn-service/turn_processor_step';
import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ElectionService } from '#election/application/service/election_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ElectionTurnService from '#election/domain/service/election_turn_service';

@inject()
export default class TurnPoliticalService extends TurnProcessorStep {
  constructor(
    private readonly electionService: ElectionService,
    private readonly electionTurnService: ElectionTurnService,
  ) {
    super('Processing political situation');
  }

  public async execute(context: TurnDataContext, gameTurnProcessStreamContainer: GameTurnProcessStreamData): Promise<void> {
    super.updateStreamData(gameTurnProcessStreamContainer);
    if (this.electionTurnService.hasElectionForTurn(context.game.turn)) {
      await this.electionService.processElection(context.game, context.politicalParties, context.socialClasses);
    }
  }
}
