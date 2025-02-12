import type PoliticalAffiliationLawHappinessEffect
  from '#political-party/domain/models/political_affiliation_law_happiness_effect';

export default abstract class IPoliticalAffiliationLawHappinessEffectRepository {
  public abstract createMany(politicalAffiliationLawHappinessEffects: PoliticalAffiliationLawHappinessEffect[]): Promise<void>;
}
