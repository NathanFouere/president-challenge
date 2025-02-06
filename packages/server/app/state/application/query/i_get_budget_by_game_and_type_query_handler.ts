import type GetBudgetByGameAndTypeQuery from '#state/application/query/get_budget_by_game_and_type_query';
import type Budget from '#state/domain/model/budget';

export default abstract class IGetBudgetByGameAndTypeQueryHandler {
  public abstract handle(query: GetBudgetByGameAndTypeQuery): Promise<Budget>;
}
