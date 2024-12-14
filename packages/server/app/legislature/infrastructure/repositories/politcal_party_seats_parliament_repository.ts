import PoliticalPartySeatsParliament from '#legislature/domain/models/political_party_seats_parliament';

export class PoliticalPartySeatsParliamentRepository {
  public async save(politicalPartySeatsParliament: PoliticalPartySeatsParliament): Promise<void> {
    politicalPartySeatsParliament.save();
  }

  public async createMany(politicalPartySeatsParliaments: PoliticalPartySeatsParliament[]): Promise<void> {
    PoliticalPartySeatsParliament.createMany(politicalPartySeatsParliaments);
  }
}
