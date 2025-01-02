import type PoliticalParty from '#political-party/domain/models/political_party';
import type GetPoliticalPartyOfGameQuery from '#political-party/application/queries/get_political_party_of_game_query';

export default abstract class IGetPoliticalPartyOfGameQueryHandler {
  public abstract handle(query: GetPoliticalPartyOfGameQuery): Promise<PoliticalParty>;
  public abstract handleForDisplay(query: GetPoliticalPartyOfGameQuery): Promise<PoliticalParty>;
}
