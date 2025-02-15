import type GetBudgetByGameAndTypeQuery from '#budget/application/query/get_budget_by_game_and_type_query';
import type Budget from '#budget/domain/model/budget';

export default abstract class IGetBudgetByGameAndTypeQueryHandler {
  public abstract handle(query: GetBudgetByGameAndTypeQuery): Promise<Budget>;
}
