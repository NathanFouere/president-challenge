import Senate from '#legislature/domain/models/senate';
import type { GetSenateByGameQuery } from '#legislature/application/query/get_senate_by_game_query';
import type IGetSenateByGameQueryHandler from '#legislature/application/query/i_get_senate_by_game_query_handler';

export default class GetSenateByGameQueryHandler implements IGetSenateByGameQueryHandler {
  public async handle(getSenateByGameQuery: GetSenateByGameQuery): Promise<Senate> {
    return await Senate
      .query()
      .where('game_id', getSenateByGameQuery.gameId)
      .preload('partySeats', (query) => {
        query.preload('politicalParty', (query) => {
          query.preload('definition');
        });
      })
      .firstOrFail();
  }
}
