import type PoliticalAffiliationLawHappinessEffect
  from '#political-party/domain/models/political_affiliation_law_happiness_effect';

export default abstract class IPoliticalAffiliationLawHappinessEffectRepository {
  public abstract saveOrUpdateAll(politicalAffiliationLawHappinessEffects: PoliticalAffiliationLawHappinessEffect[]): Promise<void>;
  public abstract getById(id: string): Promise<PoliticalAffiliationLawHappinessEffect>;
  public abstract findById(id: string): Promise<PoliticalAffiliationLawHappinessEffect | null>;
}
