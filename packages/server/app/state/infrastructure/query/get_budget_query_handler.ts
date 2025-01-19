import type IGetBudgetQueryHandler from '#state/application/query/i_get_budget_query_handler';
import Budget from '#state/domain/model/budget';
import type GetBudgetQuery from '#state/application/query/get_budget_query';

export default class GetBudgetOfStateQueryHandler implements IGetBudgetQueryHandler {
  private async getBudgetOfState(
    query: GetBudgetQuery,
    preloadOptions: { licensedFile?: boolean } = {},
  ): Promise<Budget> {
    const queryBuilder = Budget.query().where('id', query.budgetId);

    if (preloadOptions.licensedFile) {
      queryBuilder.preload('licensedFile');
    }

    return queryBuilder.firstOrFail();
  }

  public async handle(query: GetBudgetQuery): Promise<Budget> {
    return await this.getBudgetOfState(query, {});
  }

  public async handleForDisplay(query: GetBudgetQuery): Promise<Budget> {
    return await this.getBudgetOfState(query, {
      licensedFile: true,
    });
  }
}
