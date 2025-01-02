import PoliticalParty from '#political-party/domain/models/political_party';
import type IPoliticalPartyRepository from '#political-party/domain/repository/i_political_party_repository';

export default class PoliticalPartyRepository implements IPoliticalPartyRepository {
  public async save(politicalParty: PoliticalParty): Promise<void> {
    await politicalParty.save();
  }

  public async saveMany(politicalParties: PoliticalParty[]): Promise<void> {
    const promises = politicalParties.map(politicalParty => this.save(politicalParty));
    await Promise.all(promises);
  }

  public async delete(politicalParty: PoliticalParty): Promise<void> {
    await politicalParty.delete();
  }

  public async createMany(politicalParties: PoliticalParty[]): Promise<void> {
    await PoliticalParty.createMany(politicalParties);
  }

  public async getByAffiliationAndGameId(affiliation: string, gameId: number): Promise<PoliticalParty> {
    return PoliticalParty.query().where('affiliation', affiliation).where('game_id', gameId).firstOrFail();
  }
}
