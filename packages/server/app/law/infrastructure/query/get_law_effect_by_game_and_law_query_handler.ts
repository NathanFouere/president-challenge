import LawEffect from '#law/domain/model/law-effect/law_effect';
import type GetLawEffectByGameAndLawQuery from '#law/application/query/law-effect/get_law_effect_by_game_and_law_query';
import type IGetLawEffectByGameAndLawQueryHandler
  from '#law/application/query/law-effect/i_get_law_effect_by_game_and_law_query_handler';

export default class GetLawEffectByGameAndLawQueryHandler implements IGetLawEffectByGameAndLawQueryHandler {
  public async handle(query: GetLawEffectByGameAndLawQuery): Promise<LawEffect> {
    return await LawEffect
      .query()
      .where('game_id', query.gameId)
      .where('law_id', query.lawId)
      .firstOrFail();
  }
}
