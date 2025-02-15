import { Parliament } from '#legislature/domain/models/parliament';
import type { GetParliamentByGameQuery } from '#legislature/application/query/get_parliament_by_game_query';
import type IGetParliamentByGameQueryHandler from '#legislature/application/query/i_get_parliament_by_game_query_handler';

export default class GetParliamentByGameQueryHandler implements IGetParliamentByGameQueryHandler {
  public async handle(getParliamentByUserAndGameQuery: GetParliamentByGameQuery): Promise<Parliament> {
    return await Parliament
      .query()
      .where('game_id', getParliamentByUserAndGameQuery.gameId)
      .preload('partySeats', (query) => {
        query.preload('politicalParty', (query) => {
          query.preload('definition');
        });
      })
      .firstOrFail();
  }
}
