import { Parliament } from '#legislature/domain/models/parliament';
import type { GetParliamentByGameQuery } from '#legislature/application/query/get_parliament_by_game_query';

export class GetParliamentByGameQueryHandler {
  public async handle(getParliamentByUserAndGameQuery: GetParliamentByGameQuery): Promise<Parliament> {
    return await Parliament
      .query()
      .where('game_id', getParliamentByUserAndGameQuery.gameId)
      .preload('partySeats', (query) => {
        query.preload('politicalParty');
      })
      .firstOrFail();
  }
}
