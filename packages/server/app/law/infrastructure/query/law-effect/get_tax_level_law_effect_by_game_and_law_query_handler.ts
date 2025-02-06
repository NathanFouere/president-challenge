import type IGetTaxLevelLawEffectByGameAndLawQueryHandler
  from '#law/application/query/law-effect/i_get_tax_level_law_effect_by_game_and_law_query_handler';
import TaxLevelLawEffect from '#law/domain/model/law-effect/tax_level_law_effect';
import type GetLawEffectByGameAndLawQuery from '#law/application/query/law-effect/get_law_effect_by_game_and_law_query';

export default class GetTaxLevelLawEffectByGameAndLawQueryHandler implements IGetTaxLevelLawEffectByGameAndLawQueryHandler {
  public async handle(query: GetLawEffectByGameAndLawQuery): Promise<TaxLevelLawEffect> {
    return TaxLevelLawEffect
      .query()
      .where('gameId', query.gameId)
      .where('lawId', query.lawId)
      .preload('tax')
      .firstOrFail();
  }
}
