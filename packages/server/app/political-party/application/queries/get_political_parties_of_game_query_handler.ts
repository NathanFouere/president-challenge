import PoliticalParty from '#political-party/domain/models/political_party';
import type GetPoliticalPartiesOfGameQuery from '#political-party/application/queries/get_political_parties_of_game_query';

export class GetPoliticalPartiesOfGameQueryHandler {
  public async handle(query: GetPoliticalPartiesOfGameQuery): Promise<PoliticalParty[]> {
    return PoliticalParty.query().where('game_id', query.gameId).preload('licensedFile').exec();
  }
}
