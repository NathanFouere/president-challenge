import IGetPropertyLawByIdAndGameQueryHandler from '#legislature/application/query/i_get_property_law_by_id_and_game_query_handler';
import type { GetPropertyLawByIdAndGameQuery } from '#legislature/application/query/get_property_law_by_id_and_game_query';
import PropertyLaw from '#legislature/domain/models/property_law';

export default class GetPropertyLawByIdAndGameQueryHandler extends IGetPropertyLawByIdAndGameQueryHandler {
  public async handle(query: GetPropertyLawByIdAndGameQuery): Promise<PropertyLaw> {
    return await PropertyLaw.query().where('id', query.lawId).where('game_id', query.gameId).firstOrFail();
  }
}
