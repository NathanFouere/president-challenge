import type PoliticalPartyHappinessPerTurn from '#political-party/domain/models/political_party_happiness_per_turn';

export default abstract class IPoliticalPartyHappinessPerTurnRepository {
  public abstract save(politicalPartyHappinessPerTurn: PoliticalPartyHappinessPerTurn): Promise<void>;
  public abstract delete(politicalPartyHappinessPerTurn: PoliticalPartyHappinessPerTurn): Promise<void>;
}
