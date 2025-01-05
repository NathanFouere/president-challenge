import type IPoliticalPartyHappinessModifierRepository
  from '#political-party/domain/repository/i_political_party_happiness_modifier_repository';
import type PoliticalPartyHappinessModifier from '#political-party/domain/models/political_party_happiness_modifier';

export default class PoliticalPartyHappinessModifierRepository implements IPoliticalPartyHappinessModifierRepository {
  public async save(politicalPartyHappinessModifier: PoliticalPartyHappinessModifier): Promise<void> {
    await politicalPartyHappinessModifier.save();
  }

  public async delete(politicalPartyHappinessModifier: PoliticalPartyHappinessModifier): Promise<void> {
    await politicalPartyHappinessModifier.delete();
  }

  public async saveMany(politicalPartyHappinessModifiers: PoliticalPartyHappinessModifier[]): Promise<void> {
    const promises = politicalPartyHappinessModifiers.map(politicalPartyHappinessModifier => this.save(politicalPartyHappinessModifier));
    await Promise.all(promises);
  }

  public async deleteMany(politicalPartyHappinessModifiers: PoliticalPartyHappinessModifier[]): Promise<void> {
    const promises = politicalPartyHappinessModifiers.map(politicalPartyHappinessModifier => politicalPartyHappinessModifier.delete());
    await Promise.all(promises);
  }
}
