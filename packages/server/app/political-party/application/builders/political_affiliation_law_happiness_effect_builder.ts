import PoliticalAffiliationLawHappinessEffect
  from '#political-party/domain/models/political_affiliation_law_happiness_effect';
import PoliticalAffiliationHappinessEffectBuilder
  from '#political-party/application/builders/political_affiliation_happiness_effect_builder';

export default class PoliticalAffiliationLawHappinessEffectBuilder extends PoliticalAffiliationHappinessEffectBuilder {
  private lawEffectIdentifier: string | null = null;

  public withLawEffectIdentifier(lawEffectIdentifier: string): this {
    this.lawEffectIdentifier = lawEffectIdentifier;
    return this;
  }

  public build(): PoliticalAffiliationLawHappinessEffect {
    const politicalAffiliationLawHappinessEffect = new PoliticalAffiliationLawHappinessEffect();

    if (this.identifier !== null) politicalAffiliationLawHappinessEffect.identifier = this.identifier;
    else throw new Error('Identifier is required');

    if (this.politicalAffiliation !== null) politicalAffiliationLawHappinessEffect.politicalAffiliation = this.politicalAffiliation;
    else throw new Error('Political affiliation is required');

    if (this.happinessModifier !== null) politicalAffiliationLawHappinessEffect.happinessModifier = this.happinessModifier;
    else throw new Error('Happiness modifier is required');

    politicalAffiliationLawHappinessEffect.duration = this.duration;

    if (this.type !== null) politicalAffiliationLawHappinessEffect.type = this.type;
    else throw new Error('Type is required');

    if (this.lawEffectIdentifier !== null) politicalAffiliationLawHappinessEffect.lawEffectIdentifier = this.lawEffectIdentifier;
    else throw new Error('Law id is required');

    return politicalAffiliationLawHappinessEffect;
  }
}

export function aPoliticalAffiliationLawHappinessEffect(): PoliticalAffiliationLawHappinessEffectBuilder {
  return new PoliticalAffiliationLawHappinessEffectBuilder();
}
