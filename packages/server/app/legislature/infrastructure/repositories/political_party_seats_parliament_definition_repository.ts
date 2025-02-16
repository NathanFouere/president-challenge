import type IPoliticalPartySeatsParliamentDefinitionRepository
  from '#legislature/domain/repository/i_political_party_seats_parliament_definition_repository';
import PoliticalPartySeatsParliamentDefinition
  from '#legislature/domain/models/political_party_seats_parliament_definition';

export default class PoliticalPartySeatsParliamentDefinitionRepository implements IPoliticalPartySeatsParliamentDefinitionRepository {
  public async save(politicalPartySeatsParliament: PoliticalPartySeatsParliamentDefinition): Promise<void> {
    politicalPartySeatsParliament.save();
  }

  public async createMany(politicalPartySeatsParliaments: PoliticalPartySeatsParliamentDefinition[]): Promise<void> {
    PoliticalPartySeatsParliamentDefinition.createMany(politicalPartySeatsParliaments);
  }

  public async findAll(): Promise<PoliticalPartySeatsParliamentDefinition[]> {
    return PoliticalPartySeatsParliamentDefinition.all();
  }
}
