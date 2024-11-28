import PoliticalParty from '#political-party/domain/models/political_party';

export class PoliticalPartyRepository {
  public async getPoliticalPartyOfGameIdById(id: number, gameId: number): Promise<PoliticalParty> {
    return PoliticalParty.query().where('id', id).where('game_id', gameId).firstOrFail();
  }
}
