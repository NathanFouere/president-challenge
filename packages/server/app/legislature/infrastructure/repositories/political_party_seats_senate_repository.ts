import PoliticalPartySeatsSenate from '#legislature/domain/models/political_party_seats_senate';
import type IPoliticalPartySeatsSenateRepository
  from '#legislature/domain/repository/i_politcal_party_seats_senate_repository';

export default class PoliticalPartySeatsSenateRepository implements IPoliticalPartySeatsSenateRepository {
  public async save(politicalPartySeatsSenate: PoliticalPartySeatsSenate): Promise<void> {
    politicalPartySeatsSenate.save();
  }

  public async createMany(politicalPartySeatsSenates: PoliticalPartySeatsSenate[]): Promise<void> {
    PoliticalPartySeatsSenate.createMany(politicalPartySeatsSenates);
  }
}
