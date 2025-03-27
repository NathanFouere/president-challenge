import { inject } from '@adonisjs/core';

import type { GameTurnProcessStreamData } from '@president-challenge/shared/dist/game/game-turn-process-stream-data.js';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import HappinessModifierTurnGestionService
  from '#happiness-modifier/application/service/happiness_modifier_turn_gestion_service';

@inject()
export default class TurnResetService {
  constructor(
    private readonly happinessModifierTurnGestionService: HappinessModifierTurnGestionService,
  ) {
  }

  public async execute(gameId: number, gameTurnProcessStreamContainer: GameTurnProcessStreamData): Promise<void> {
    gameTurnProcessStreamContainer.message = 'Processing happiness modifiers';
    await this.happinessModifierTurnGestionService.processHappinessModifiersOfGame(gameId);
  }
}
