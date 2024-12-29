import PoliticalPartySeatsParliament from '#legislature/domain/models/political_party_seats_parliament';
import type IPoliticalPartySeatsParliamentRepository
  from '#legislature/domain/repository/i_political_party_seats_parliament_repository';

export default class PoliticalPartySeatsParliamentRepository implements IPoliticalPartySeatsParliamentRepository {
  public async save(politicalPartySeatsParliament: PoliticalPartySeatsParliament): Promise<void> {
    politicalPartySeatsParliament.save();
  }

  public async createMany(politicalPartySeatsParliaments: PoliticalPartySeatsParliament[]): Promise<void> {
    PoliticalPartySeatsParliament.createMany(politicalPartySeatsParliaments);
  }
}
