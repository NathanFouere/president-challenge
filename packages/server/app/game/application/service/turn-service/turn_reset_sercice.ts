import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import HappinessModifierTurnGestionService
  from '#happiness-modifier/application/service/happiness_modifier_turn_gestion_service';

@inject()
export default class TurnResetService {
  constructor(
    private readonly happinessModifierTurnGestionService: HappinessModifierTurnGestionService,
  ) {
  }

  public async execute(gameId: number): Promise<void> {
    await this.happinessModifierTurnGestionService.processHappinessModifiersOfGame(gameId);
  }
}
