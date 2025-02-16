import type PoliticalPartySeatsParliamentDefinition
  from '#legislature/domain/models/political_party_seats_parliament_definition';

export default abstract class IPoliticalPartySeatsParliamentDefinitionRepository {
  public abstract save(politicalPartySeatsParliament: PoliticalPartySeatsParliamentDefinition): Promise<void>;

  public abstract createMany(politicalPartySeatsParliaments: PoliticalPartySeatsParliamentDefinition[]): Promise<void>;
  public abstract findAll(): Promise<PoliticalPartySeatsParliamentDefinition[]>;
}
