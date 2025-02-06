import type IGetBudgetLevelLawEffectByGameAndLawQueryHandler
  from '#law/application/query/law-effect/i_get_budget_level_law_effect_by_game_and_law_query_handler';
import BudgetLevelLawEffect from '#law/domain/model/law-effect/budget_level_law_effect';
import type GetLawEffectByGameAndLawQuery from '#law/application/query/law-effect/get_law_effect_by_game_and_law_query';

export default class GetBudgetLevelLawEffectByGameAndLawQueryHandler implements IGetBudgetLevelLawEffectByGameAndLawQueryHandler {
  public async handle(query: GetLawEffectByGameAndLawQuery): Promise<BudgetLevelLawEffect> {
    return BudgetLevelLawEffect
      .query()
      .where('gameId', query.gameId)
      .where('lawId', query.lawId)
      .preload('budget')
      .firstOrFail();
  }
}
