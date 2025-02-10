import type LawEffect from '#law/domain/model/law-effect/law_effect';
import type GetLawEffectByGameAndLawQuery from '#law/application/query/law-effect/get_law_effect_by_game_and_law_query';

export default abstract class IGetLawEffectByGameAndLawQueryHandler {
  public abstract handle(query: GetLawEffectByGameAndLawQuery): Promise<LawEffect>;
}
