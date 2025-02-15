import type Budget from '#budget/domain/model/budget';
import type GetBudgetQuery from '#budget/application/query/get_budget_query';

export default abstract class IGetBudgetQueryHandler {
  public abstract handle(query: GetBudgetQuery): Promise<Budget>;
  public abstract handleForDisplay(query: GetBudgetQuery): Promise<Budget>;
}
