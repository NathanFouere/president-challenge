import { inject } from '@adonisjs/core';
import type { TurnProcessorStep } from '#game/application/service/turn-service/turn_processor_step';
import type { TurnDataContext } from '#game/application/service/turn-service/load_turn_data_context_service';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ElectionService } from '#election/application/service/election_service';

@inject()
export default class TurnPoliticalService implements TurnProcessorStep {
  constructor(
    private readonly electionService: ElectionService,
  ) {
  }

  public async execute(context: TurnDataContext): Promise<void> {
    if (this.electionService.hasElectionForTurn(context.game.turn)) {
      await this.electionService.processElection(context.game, context.politicalParties, context.socialClasses);
    }
  }
}
