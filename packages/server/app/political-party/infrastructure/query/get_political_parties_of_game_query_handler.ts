import PoliticalParty from '#political-party/domain/models/political_party';
import type GetPoliticalPartiesOfGameQuery from '#political-party/application/queries/get_political_parties_of_game_query';
import type IGetPoliticalPartiesOfGameQueryHandler
  from '#political-party/application/queries/i_get_political_parties_of_game_query_handler';

export default class GetPoliticalPartiesOfGameQueryHandler implements IGetPoliticalPartiesOfGameQueryHandler {
  public async handle(query: GetPoliticalPartiesOfGameQuery): Promise<PoliticalParty[]> {
    return PoliticalParty.query().where('game_id', query.gameId).preload('licensedFile').exec();
  }
}
