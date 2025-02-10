import PoliticalAffiliationLawHappinessEffect
  from '#political-party/domain/models/political_affiliation_law_happiness_effect';
import type IPoliticalAffiliationLawHappinessEffectRepository
  from '#political-party/domain/repository/i_political_affiliation_law_happiness_effect_repository';

export default class PoliticalAffiliationLawHappinessEffectRepository implements IPoliticalAffiliationLawHappinessEffectRepository {
  public async findById(id: string): Promise<PoliticalAffiliationLawHappinessEffect | null> {
    return await PoliticalAffiliationLawHappinessEffect.find(id);
  }

  public async getById(id: string): Promise<PoliticalAffiliationLawHappinessEffect> {
    const politicalAffiliationLawHappinessEffect = await this.findById(id);
    if (politicalAffiliationLawHappinessEffect === null) {
      throw new Error(`PoliticalAffiliationLawHappinessEffect with id ${id} not found`);
    }

    return politicalAffiliationLawHappinessEffect;
  }

  public async saveOrUpdateAll(politicalAffiliationLawHappinessEffects: PoliticalAffiliationLawHappinessEffect[]): Promise<void> {
    for (const politicalAffiliationLawHappinessEffect of politicalAffiliationLawHappinessEffects) {
      const existingEffect = await this.findById(politicalAffiliationLawHappinessEffect.identifier);

      if (existingEffect) {
        existingEffect.merge(politicalAffiliationLawHappinessEffect.$attributes);
        await existingEffect.save();
      }
      else {
        await politicalAffiliationLawHappinessEffect.save();
      }
    }
  }
}
