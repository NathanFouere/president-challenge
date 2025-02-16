import type PoliticalPartySeatsSenateDefinition from '#legislature/domain/models/political_party_seats_senate_definition';

export default abstract class IPoliticalPartySeatsSenateDefinitionRepository {
  public abstract save(politicalPartySeatsSenate: PoliticalPartySeatsSenateDefinition): Promise<void>;

  public abstract createMany(politicalPartySeatsSenates: PoliticalPartySeatsSenateDefinition[]): Promise<void>;
  public abstract findAll(): Promise<PoliticalPartySeatsSenateDefinition[]>;
}
