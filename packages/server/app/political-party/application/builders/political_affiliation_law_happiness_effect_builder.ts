import PoliticalAffiliationLawHappinessEffect
  from '#political-party/domain/models/political_affiliation_law_happiness_effect';
import PoliticalAffiliationHappinessEffectBuilder
  from '#political-party/application/builders/political_affiliation_happiness_effect_builder';

export default class PoliticalAffiliationLawHappinessEffectBuilder extends PoliticalAffiliationHappinessEffectBuilder {
  protected lawDefinitionId: number | null = null;

  public withLawDefinitionId(lawId: number): this {
    this.lawDefinitionId = lawId;
    return this;
  }

  public build(): PoliticalAffiliationLawHappinessEffect {
    const politicalAffiliationLawHappinessEffect = new PoliticalAffiliationLawHappinessEffect();

    if (this.politicalAffiliation !== null) politicalAffiliationLawHappinessEffect.politicalAffiliation = this.politicalAffiliation;
    else throw new Error('Political affiliation is required');

    if (this.lawDefinitionId !== null) politicalAffiliationLawHappinessEffect.lawDefinitionId = this.lawDefinitionId;
    else throw new Error('Law id is required');

    if (this.happinessModifier !== null) politicalAffiliationLawHappinessEffect.happinessModifier = this.happinessModifier;
    else throw new Error('Happiness modifier is required');

    politicalAffiliationLawHappinessEffect.duration = this.duration;

    if (this.type !== null) politicalAffiliationLawHappinessEffect.type = this.type;
    else throw new Error('Type is required');

    return politicalAffiliationLawHappinessEffect;
  }
}

export function aPoliticalAffiliationLawHappinessEffect(): PoliticalAffiliationLawHappinessEffectBuilder {
  return new PoliticalAffiliationLawHappinessEffectBuilder();
}
