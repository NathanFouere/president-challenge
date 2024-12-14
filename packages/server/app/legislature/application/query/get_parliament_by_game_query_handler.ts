import { Parliament } from '#legislature/domain/models/parliament';
import type { GetParliamentByGameQuery } from '#legislature/application/query/get_parliament_by_game_query';

export class GetParliamentByGameQueryHandler {
  public async handle(getParliamentByUserAndGameQuery: GetParliamentByGameQuery) {
    return Parliament.query().where('game_id', getParliamentByUserAndGameQuery.gameId).first();
  }
}
