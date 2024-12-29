import type PoliticalParty from '#political-party/domain/models/political_party';
import type GetPoliticalPartiesOfGameQuery from '#political-party/application/queries/get_political_party_of_game_query';

export default abstract class IGetPoliticalPartyOfGameQueryHandler {
  public abstract handle(query: GetPoliticalPartiesOfGameQuery): Promise<PoliticalParty>;
}
