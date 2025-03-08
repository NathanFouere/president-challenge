import type PoliticalPartySeatsParliament from '#legislature/domain/models/political_party_seats_parliament';

export default abstract class IPoliticalPartySeatsParliamentRepository {
  public abstract save(politicalPartySeatsParliament: PoliticalPartySeatsParliament): Promise<void>;

  public abstract createMany(politicalPartySeatsParliaments: PoliticalPartySeatsParliament[]): Promise<void>;

  public abstract saveMany(politicalPartySeatsParliaments: PoliticalPartySeatsParliament[]): Promise<void>;
}
