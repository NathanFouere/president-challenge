import type { PoliticalAffiliation } from '@president-challenge/shared/dist/political-party/political-affiliation.js';
import type { HappinessModifierType } from '@president-challenge/shared/dist/common/happiness-modifier-type.js';

export default abstract class PoliticalAffiliationHappinessEffectBuilder {
  protected identifier: string | null = null;
  protected politicalAffiliation: PoliticalAffiliation | null = null;
  protected happinessModifier: number | null = null;
  protected duration: number | null = null;
  protected type: HappinessModifierType | null = null;

  public withIdentifier(identifier: string): this {
    this.identifier = identifier;
    return this;
  }

  public withPoliticalAffiliation(politicalAffiliation: PoliticalAffiliation): this {
    this.politicalAffiliation = politicalAffiliation;
    return this;
  }

  public withHappinessModifier(happinessModifier: number): this {
    this.happinessModifier = happinessModifier;
    return this;
  }

  public withDuration(duration: number | null): this {
    this.duration = duration;
    return this;
  }

  public withType(type: HappinessModifierType): this {
    this.type = type;
    return this;
  }
}
