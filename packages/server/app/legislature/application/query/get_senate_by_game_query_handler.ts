import Senate from '#legislature/domain/models/senate';
import type { GetSenateByGameQuery } from '#legislature/application/query/get_senate_by_game_query';

export class GetSenateByGameQueryHandler {
  public async handle(getSenateByGameQuery: GetSenateByGameQuery) {
    return Senate.query().where('game_id', getSenateByGameQuery.gameId).first();
  }
}
