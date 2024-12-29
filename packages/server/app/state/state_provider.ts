import AppProvider from '#common/provider';
import IStateEconomicalSituationPerTurnRepository
  from '#state/domain/repository/i_state_economical_situation_per_turn_repository';
import IStateRepository from '#state/domain/repository/i_state_repository';
import IGetStateOfGameQueryHandler from '#state/application/query/i_get_state_of_game_query_handler';

export default class StateProvider extends AppProvider {
  public async boot(): Promise<void> {
    const { default: StateRepository } = await import(
      '#state/infrastructure/repository/state_repository'
    );
    const { default: StateEconomicalSituationPerTurnRepository } = await import(
      '#state/infrastructure/repository/state_economical_situation_per_turn_repository'
    );
    const { default: GetStateOfGameQueryHandler } = await import(
      '#state/infrastructure/query/get_state_of_game_query_handler'
    );

    this.app.container.bind(IGetStateOfGameQueryHandler, () => {
      return new GetStateOfGameQueryHandler();
    });

    this.app.container.bind(IStateRepository, () => {
      return new StateRepository();
    });

    this.app.container.bind(IStateEconomicalSituationPerTurnRepository, () => {
      return new StateEconomicalSituationPerTurnRepository();
    });
  }
}
