import type TaxLevelLawEffect from '#law/domain/model/law-effect/tax_level_law_effect';
import type GetLawEffectByGameAndLawQuery
  from '#law/application/query/law-effect/get_law_effect_by_game_and_law_query';

export default abstract class IGetTaxLevelLawEffectByGameAndLawQueryHandler {
  public abstract handle(query: GetLawEffectByGameAndLawQuery): Promise<TaxLevelLawEffect>;
}
