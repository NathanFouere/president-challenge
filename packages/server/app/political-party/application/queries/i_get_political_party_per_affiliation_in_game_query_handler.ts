import type GetPoliticalPartyPerAffiliationInGameQuery
  from '#political-party/application/queries/get_political_party_per_affiliation_in_game_query';
import type PoliticalParty from '#political-party/domain/models/political_party';

export abstract class IGetPoliticalPartyPerAffiliationInGameQueryHandler {
  public abstract handle(query: GetPoliticalPartyPerAffiliationInGameQuery): Promise<PoliticalParty>;
  public abstract handleForVote(query: GetPoliticalPartyPerAffiliationInGameQuery): Promise<PoliticalParty>;
}
