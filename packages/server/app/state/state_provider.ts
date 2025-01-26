import AppProvider from '#common/provider';
import IStateEconomicalSituationPerTurnRepository
  from '#state/domain/repository/i_state_economical_situation_per_turn_repository';
import IStateRepository from '#state/domain/repository/i_state_repository';
import IGetStateOfGameQueryHandler from '#state/application/query/i_get_state_of_game_query_handler';
import IBudgetRepository from '#state/domain/repository/i_budget_repository';
import IGetBudgetOfStateQueryHandler from '#state/application/query/i_get_budget_query_handler';
import IFinancialFlowRepository from '#state/domain/repository/i_financial_flow_repository';

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

    const { default: BudgetRepository } = await import(
      '#state/infrastructure/repository/budget_repository'
    );

    const { default: GetBudgetOfStateQueryHandler } = await import(
      '#state/infrastructure/query/get_budget_query_handler'
    );

    const { default: FinancialFlowRepository } = await import(
      '#state/infrastructure/repository/financial_flow_repository'
    );

    this.app.container.bind(IFinancialFlowRepository, () => {
      return new FinancialFlowRepository();
    });

    this.app.container.bind(IGetBudgetOfStateQueryHandler, () => {
      return new GetBudgetOfStateQueryHandler();
    });

    this.app.container.bind(IBudgetRepository, () => {
      return new BudgetRepository();
    });

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
