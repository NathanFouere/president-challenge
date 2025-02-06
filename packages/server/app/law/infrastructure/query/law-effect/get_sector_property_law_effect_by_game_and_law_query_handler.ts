import type IGetSectorPropertyLawEffectByGameAndLawQueryHandler
  from '#law/application/query/law-effect/i_get_sector_property_law_effect_by_game_and_law_query_handler';
import SectorPropertyLawEffect from '#law/domain/model/law-effect/sector_property_law_effect';
import type GetLawEffectByGameAndLawQuery from '#law/application/query/law-effect/get_law_effect_by_game_and_law_query';

export default class GetSectorPropertyLawEffectByGameAndLawQueryHandler implements IGetSectorPropertyLawEffectByGameAndLawQueryHandler {
  public async handle(query: GetLawEffectByGameAndLawQuery): Promise<SectorPropertyLawEffect> {
    return SectorPropertyLawEffect
      .query()
      .where('gameId', query.gameId)
      .where('lawId', query.lawId)
      .preload('sector')
      .firstOrFail();
  }
}
