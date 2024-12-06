import PoliticalParty from '#political-party/domain/models/political_party';
import type GetPoliticalPartiesOfGameQuery from '#political-party/application/queries/get_political_party_of_game_query';

export class GetPoliticalPartyOfGameQueryHandler {
  public async handle(query: GetPoliticalPartiesOfGameQuery): Promise<PoliticalParty> {
    return PoliticalParty.query().where('id', query.politicalPartyId).where('game_id', query.gameId).preload('licensedFile').firstOrFail();
  }
}
