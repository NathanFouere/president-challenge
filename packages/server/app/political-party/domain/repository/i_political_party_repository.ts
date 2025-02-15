import type PoliticalParty from '#political-party/domain/models/political_party';

export default abstract class IPoliticalPartyRepository {
  public abstract save(politicalParty: PoliticalParty): Promise<void>;
  public abstract delete(politicalParty: PoliticalParty): Promise<void>;
  public abstract createMany(politicalParties: PoliticalParty[]): Promise<void>;
}
