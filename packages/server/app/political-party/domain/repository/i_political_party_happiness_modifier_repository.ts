import type PoliticalPartyHappinessModifier from '#political-party/domain/models/political_party_happiness_modifier';

export default abstract class IPoliticalPartyHappinessModifierRepository {
  public abstract save(politicalPartyHappinessModifier: PoliticalPartyHappinessModifier): Promise<void>;
  public abstract delete(politicalPartyHappinessModifier: PoliticalPartyHappinessModifier): Promise<void>;
  public abstract deleteMany(politicalPartyHappinessModifiers: PoliticalPartyHappinessModifier[]): Promise<void>;
  public abstract saveMany(politicalPartyHappinessModifiers: PoliticalPartyHappinessModifier[]): Promise<void>;
}
