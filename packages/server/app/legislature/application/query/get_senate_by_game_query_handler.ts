import Senate from '#legislature/domain/models/senate';
import type { GetSenateByGameQuery } from '#legislature/application/query/get_senate_by_game_query';

export class GetSenateByGameQueryHandler {
  public async handle(getSenateByGameQuery: GetSenateByGameQuery): Promise<Senate> {
    return await Senate
      .query()
      .where('game_id', getSenateByGameQuery.gameId)
      .preload('partySeats', (query) => {
        query.preload('politicalParty');
      })
      .firstOrFail();
  }
}
