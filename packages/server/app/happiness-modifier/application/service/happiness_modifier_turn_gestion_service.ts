import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetTemporaryHappinessModifiersOfGameForTurnQueryHandler
  from '#happiness-modifier/application/query/i_get_temporary_happiness_modifiers_of_game_for_turn_query_handler';
import GetTemporaryHappinessModifiersOfGameForTurnQuery
  from '#happiness-modifier/application/query/get_temporary_happiness_modifiers_of_game_for_turn_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IHappinessModifierRepository from '#happiness-modifier/domain/repository/i_happiness_modifier_repository';

@inject()
export default class HappinessModifierTurnGestionService {
  constructor(
    private readonly getTemporaryHappinessModifiersOfGameForTurnQueryHandler: IGetTemporaryHappinessModifiersOfGameForTurnQueryHandler,
    private readonly happinessModifierRepository: IHappinessModifierRepository,
  ) {
  }

  public async processHappinessModifiersOfGame(gameId: number): Promise<void> {
    const temporaryHappinessModifiers = await this.getTemporaryHappinessModifiersOfGameForTurnQueryHandler.handle(new GetTemporaryHappinessModifiersOfGameForTurnQuery(
      gameId,
    ));

    const happinessModifiersToRemove = [];
    const happinessModifiersToSave = [];
    for (const happinessModifier of temporaryHappinessModifiers) {
      if (!happinessModifier.duration) {
        throw new Error('Happiness modifier duration is not set');
      }
      happinessModifier.reduceDuration();
      if (happinessModifier.duration === 0) {
        happinessModifiersToRemove.push(happinessModifier);
      }
      else {
        happinessModifiersToSave.push(happinessModifier);
      }
    }

    await this.happinessModifierRepository.deleteMany(happinessModifiersToRemove);
    await this.happinessModifierRepository.saveMany(happinessModifiersToSave);
  }
}
