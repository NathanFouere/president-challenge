import SocialClassHappinessEffectBuilder
  from '#social-class/application/builders/social_class_happiness_effect_builder';
import SocialClassLawHappinessEffect from '#social-class/domain/models/social_class_law_happiness_effect';

export default class SocialClassLawHappinessEffectBuilder extends SocialClassHappinessEffectBuilder {
  protected lawDefinitionId: number | null = null;

  public withLawDefinitionId(lawId: number): this {
    this.lawDefinitionId = lawId;
    return this;
  }

  public build(): SocialClassLawHappinessEffect {
    const socialClassHappinessEffect = new SocialClassLawHappinessEffect();
    if (this.socialClassType === null) {
      throw new Error('Social class type is required');
    }
    else {
      socialClassHappinessEffect.socialClassType = this.socialClassType;
    }
    if (this.lawDefinitionId === null) {
      throw new Error('Law id is required');
    }
    else {
      socialClassHappinessEffect.lawDefinitionId = this.lawDefinitionId;
    }
    if (this.happinessModifier === null) {
      throw new Error('Happiness modifier is required');
    }
    else {
      socialClassHappinessEffect.happinessModifier = this.happinessModifier;
    }
    if (this.type === null) {
      throw new Error('Type is required');
    }
    else {
      socialClassHappinessEffect.type = this.type;
    }
    socialClassHappinessEffect.duration = this.duration;
    return socialClassHappinessEffect;
  }
}

export function aSocialClassLawHappinessEffect(): SocialClassLawHappinessEffectBuilder {
  return new SocialClassLawHappinessEffectBuilder();
}
