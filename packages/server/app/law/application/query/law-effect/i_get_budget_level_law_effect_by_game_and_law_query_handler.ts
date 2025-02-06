import type BudgetLevelLawEffect from '#law/domain/model/law-effect/budget_level_law_effect';
import type GetLawEffectByGameAndLawQuery from '#law/application/query/law-effect/get_law_effect_by_game_and_law_query';

export default abstract class IGetBudgetLevelLawEffectByGameAndLawQueryHandler {
  public abstract handle(query: GetLawEffectByGameAndLawQuery): Promise<BudgetLevelLawEffect>;
}
