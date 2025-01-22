import type Budget from '#state/domain/model/budget';
import type GetBudgetQuery from '#state/application/query/get_budget_query';

export default abstract class IGetBudgetQueryHandler {
  public abstract handle(query: GetBudgetQuery): Promise<Budget>;
  public abstract handleForDisplay(query: GetBudgetQuery): Promise<Budget>;
}
