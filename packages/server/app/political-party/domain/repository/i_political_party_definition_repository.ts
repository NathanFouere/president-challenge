import type PoliticalPartyDefinition from '#political-party/domain/models/political_party_definition';

export default abstract class IPoliticalPartyDefinitionRepository {
  public abstract save(politicalParty: PoliticalPartyDefinition): Promise<void>;
  public abstract delete(politicalParty: PoliticalPartyDefinition): Promise<void>;
  public abstract createMany(politicalParties: PoliticalPartyDefinition[]): Promise<void>;
  public abstract findAll(): Promise<PoliticalPartyDefinition[]>;
}
