import PoliticalPartySeatsSenate from '#legislature/domain/models/political_party_seats_senate';

export class PoliticalPartySeatsSenateRepository {
  public async save(politicalPartySeatsSenate: PoliticalPartySeatsSenate): Promise<void> {
    politicalPartySeatsSenate.save();
  }

  public async createMany(politicalPartySeatsSenates: PoliticalPartySeatsSenate[]): Promise<void> {
    PoliticalPartySeatsSenate.createMany(politicalPartySeatsSenates);
  }
}
