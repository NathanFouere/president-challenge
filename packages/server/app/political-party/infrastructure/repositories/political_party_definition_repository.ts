import type IPoliticalPartyDefinitionRepository
  from '#political-party/domain/repository/i_political_party_definition_repository';
import PoliticalPartyDefinition from '#political-party/domain/models/political_party_definition';

export default class PoliticalPartyDefinitionRepository implements IPoliticalPartyDefinitionRepository {
  public async save(politicalParty: PoliticalPartyDefinition): Promise<void> {
    await politicalParty.save();
  }

  public async saveMany(politicalParties: PoliticalPartyDefinition[]): Promise<void> {
    const promises = politicalParties.map(politicalParty => this.save(politicalParty));
    await Promise.all(promises);
  }

  public async delete(politicalParty: PoliticalPartyDefinition): Promise<void> {
    await politicalParty.delete();
  }

  public async createMany(politicalParties: PoliticalPartyDefinition[]): Promise<void> {
    await PoliticalPartyDefinition.createMany(politicalParties);
  }

  public async findAll(): Promise<PoliticalPartyDefinition[]> {
    return PoliticalPartyDefinition.all();
  }
}
