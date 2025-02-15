import PoliticalAffiliationLawHappinessEffect
  from '#political-party/domain/models/political_affiliation_law_happiness_effect';
import type IPoliticalAffiliationLawHappinessEffectRepository
  from '#political-party/domain/repository/i_political_affiliation_law_happiness_effect_repository';

export default class PoliticalAffiliationLawHappinessEffectRepository implements IPoliticalAffiliationLawHappinessEffectRepository {
  public async createMany(politicalAffiliationLawHappinessEffects: PoliticalAffiliationLawHappinessEffect[]): Promise<void> {
    await PoliticalAffiliationLawHappinessEffect.createMany(politicalAffiliationLawHappinessEffects);
  }
}
