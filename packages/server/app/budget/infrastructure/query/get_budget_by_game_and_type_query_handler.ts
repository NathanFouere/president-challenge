import type GetBudgetByGameAndTypeQuery from '#budget/application/query/get_budget_by_game_and_type_query';
import Budget from '#budget/domain/model/budget';
import IGetBudgetByGameAndTypeQueryHandler from '#budget/application/query/i_get_budget_by_game_and_type_query_handler';

export default class GetBudgetByGameAndTypeQueryHandler extends IGetBudgetByGameAndTypeQueryHandler {
  public async handle(query: GetBudgetByGameAndTypeQuery): Promise<Budget> {
    return await Budget
      .query()
      .where('game_id', query.gameId)
      .preload('definition')
      .whereHas('definition', (definitionQuery) => {
        definitionQuery.where('type', query.budgetType);
      })
      .firstOrFail();
  }
}
