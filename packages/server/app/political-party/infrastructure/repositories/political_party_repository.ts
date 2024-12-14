import PoliticalParty from '#political-party/domain/models/political_party';

export class PoliticalPartyRepository {
  public async getPoliticalPartyOfGameIdById(id: number, gameId: number): Promise<PoliticalParty> {
    return PoliticalParty.query().where('id', id).where('game_id', gameId).firstOrFail();
  }

  public async save(politicalParty: PoliticalParty): Promise<void> {
    await politicalParty.save();
  }

  public async delete(politicalParty: PoliticalParty): Promise<void> {
    await politicalParty.delete();
  }

  public async createMany(politicalParties: PoliticalParty[]): Promise<void> {
    await PoliticalParty.createMany(politicalParties);
  }
}
