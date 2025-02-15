import AppProvider from '#common/provider';
import IBudgetRepository from '#budget/domain/repository/i_budget_repository';
import IGetBudgetOfStateQueryHandler from '#budget/application/query/i_get_budget_query_handler';
import IGetBudgetByGameAndTypeQueryHandler from '#budget/application/query/i_get_budget_by_game_and_type_query_handler';
import IBudgetDefinitionRepository from '#budget/domain/repository/i_budget_definition_repository';

export default class BudgetProvider extends AppProvider {
  public async boot(): Promise<void> {
    const { default: BudgetRepository } = await import(
      '#budget/infrastructure/repository/budget_repository'
    );

    const { default: GetBudgetOfStateQueryHandler } = await import(
      '#budget/infrastructure/query/get_budget_query_handler'
    );

    const { default: GetBudgetByGameAndTypeQueryHandler } = await import(
      '#budget/infrastructure/query/get_budget_by_game_and_type_query_handler'
    );

    const { default: BudgetDefinitionRepository } = await import(
      '#budget/infrastructure/repository/budget_definition_repository'
    );

    this.app.container.bind(IBudgetDefinitionRepository, () => {
      return new BudgetDefinitionRepository();
    });

    this.app.container.bind(IGetBudgetByGameAndTypeQueryHandler, () => {
      return new GetBudgetByGameAndTypeQueryHandler();
    });

    this.app.container.bind(IGetBudgetOfStateQueryHandler, () => {
      return new GetBudgetOfStateQueryHandler();
    });

    this.app.container.bind(IBudgetRepository, () => {
      return new BudgetRepository();
    });
  }
}
