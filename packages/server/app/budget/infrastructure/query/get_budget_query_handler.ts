import type IGetBudgetQueryHandler from '#budget/application/query/i_get_budget_query_handler';
import Budget from '#budget/domain/model/budget';
import type GetBudgetQuery from '#budget/application/query/get_budget_query';

export default class GetBudgetOfStateQueryHandler implements IGetBudgetQueryHandler {
  private async getBudgetOfState(
    query: GetBudgetQuery,
    preloadOptions: { licensedFile?: boolean; costPerTurn?: boolean } = {},
  ): Promise<Budget> {
    const queryBuilder = Budget.query().where('id', query.budgetId);

    queryBuilder.preload('definition', (definitionQuery) => {
      if (preloadOptions.licensedFile) {
        definitionQuery.preload('licensedFile');
      }
    });

    if (preloadOptions.costPerTurn) {
      queryBuilder.preload('levelPerTurn');
    }

    return queryBuilder.firstOrFail();
  }

  public async handle(query: GetBudgetQuery): Promise<Budget> {
    return await this.getBudgetOfState(query, {});
  }

  public async handleForDisplay(query: GetBudgetQuery): Promise<Budget> {
    return await this.getBudgetOfState(query, {
      licensedFile: true,
      costPerTurn: true,
    });
  }
}
