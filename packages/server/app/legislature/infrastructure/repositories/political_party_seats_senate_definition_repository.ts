import type IPoliticalPartySeatsSenateDefinitionRepository
  from '#legislature/domain/repository/i_politcal_party_seats_senate_definition_repository';
import PoliticalPartySeatsSenateDefinition from '#legislature/domain/models/political_party_seats_senate_definition';

export default class PoliticalPartySeatsSenateDefinitionRepository implements IPoliticalPartySeatsSenateDefinitionRepository {
  public async save(politicalPartySeatsSenate: PoliticalPartySeatsSenateDefinition): Promise<void> {
    politicalPartySeatsSenate.save();
  }

  public async createMany(politicalPartySeatsSenates: PoliticalPartySeatsSenateDefinition[]): Promise<void> {
    PoliticalPartySeatsSenateDefinition.createMany(politicalPartySeatsSenates);
  }

  public async findAll(): Promise<PoliticalPartySeatsSenateDefinition[]> {
    return PoliticalPartySeatsSenateDefinition.all();
  }
}
