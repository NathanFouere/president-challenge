import type GetLawEffectByGameAndLawQuery from '#law/application/query/law-effect/get_law_effect_by_game_and_law_query';
import type SectorPropertyLawEffect from '#law/domain/model/law-effect/sector_property_law_effect';

export default abstract class IGetSectorPropertyLawEffectByGameAndLawQueryHandler {
  public abstract handle(query: GetLawEffectByGameAndLawQuery): Promise<SectorPropertyLawEffect>;
}
