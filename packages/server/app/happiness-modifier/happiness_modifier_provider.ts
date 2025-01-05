import AppProvider from '#common/provider';
import IGetTemporaryHappinessModifiersOfGameForTurnQueryHandler
  from '#happiness-modifier/application/query/i_get_temporary_happiness_modifiers_of_game_for_turn_query_handler';
import IHappinessModifierRepository from '#happiness-modifier/domain/repository/i_happiness_modifier_repository';

export default class HappinessModifierProvider extends AppProvider {
  public async boot() {
    const { default: GetTemporaryHappinessModifiersOfGameForTurnQueryHandler } = await import(
      '#happiness-modifier/infrastructure/query/get_temporary_happiness_modifiers_of_game_for_turn_query_handler'
    );

    const { default: HappinessModifierRepository } = await import(
      '#happiness-modifier/infrastructure/repository/happiness_modifier_repository'
    );

    this.app.container.bind(IGetTemporaryHappinessModifiersOfGameForTurnQueryHandler, () => {
      return new GetTemporaryHappinessModifiersOfGameForTurnQueryHandler();
    });

    this.app.container.bind(IHappinessModifierRepository, () => {
      return new HappinessModifierRepository();
    });
  }
}
