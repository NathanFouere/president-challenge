import PoliticalPartySeatsParliament from '#legislature/domain/models/political_party_seats_parliament';
import type IPoliticalPartySeatsParliamentRepository
  from '#legislature/domain/repository/i_political_party_seats_parliament_repository';

export default class PoliticalPartySeatsParliamentRepository implements IPoliticalPartySeatsParliamentRepository {
  public async save(politicalPartySeatsParliament: PoliticalPartySeatsParliament): Promise<void> {
    await politicalPartySeatsParliament.save();
  }

  public async createMany(politicalPartySeatsParliaments: PoliticalPartySeatsParliament[]): Promise<void> {
    await PoliticalPartySeatsParliament.createMany(politicalPartySeatsParliaments);
  }

  public async saveMany(politicalPartySeatsParliaments: PoliticalPartySeatsParliament[]): Promise<void> {
    const savePromises = politicalPartySeatsParliaments.map((politicalPartySeatsParliament: PoliticalPartySeatsParliament) => politicalPartySeatsParliament.save());
    await Promise.all(savePromises);
  }
}
