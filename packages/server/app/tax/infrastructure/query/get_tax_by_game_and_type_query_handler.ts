import IGetTaxByGameAndTypeQueryHandler from '#tax/application/query/i_get_tax_by_game_and_type_query_handler';
import Tax from '#tax/domain/model/tax';
import type GetTaxByGameAndTypeQuery from '#tax/application/query/get_tax_by_game_and_type_query';

export default class GetTaxByGameAndTypeQueryHandler extends IGetTaxByGameAndTypeQueryHandler {
  public async handle(query: GetTaxByGameAndTypeQuery): Promise<Tax> {
    return await Tax
      .query()
      .where('game_id', query.gameId)
      .preload('definition')
      .whereHas('definition', (definitionQuery) => {
        definitionQuery.where('type', query.taxType);
      })
      .firstOrFail();
  }
}
