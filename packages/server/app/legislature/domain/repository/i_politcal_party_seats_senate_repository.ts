import type PoliticalPartySeatsSenate from '#legislature/domain/models/political_party_seats_senate';

export default abstract class IPoliticalPartySeatsSenateRepository {
  public abstract save(politicalPartySeatsSenate: PoliticalPartySeatsSenate): Promise<void>;

  public abstract createMany(politicalPartySeatsSenates: PoliticalPartySeatsSenate[]): Promise<void>;
}
