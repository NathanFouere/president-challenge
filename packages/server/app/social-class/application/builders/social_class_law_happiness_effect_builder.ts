import SocialClassHappinessEffectBuilder
  from '#social-class/application/builders/social_class_happiness_effect_builder';
import SocialClassLawHappinessEffect from '#social-class/domain/models/social_class_law_happiness_effect';

export default class SocialClassLawHappinessEffectBuilder extends SocialClassHappinessEffectBuilder {
  private lawEffectIdentifier: string | null = null;

  withLawEffectIdentifier(lawEffectIdentifier: string): this {
    this.lawEffectIdentifier = lawEffectIdentifier;
    return this;
  }

  public build(): SocialClassLawHappinessEffect {
    const socialClassHappinessEffect = new SocialClassLawHappinessEffect();
    if (this.identifier === null) {
      throw new Error('Identifier is required');
    }
    else {
      socialClassHappinessEffect.identifier = this.identifier;
    }
    if (this.socialClassType === null) {
      throw new Error('Social class type is required');
    }
    else {
      socialClassHappinessEffect.socialClassType = this.socialClassType;
    }
    if (this.happinessModifier === null) {
      throw new Error('Happiness modifier is required');
    }
    else {
      socialClassHappinessEffect.happinessModifier = this.happinessModifier;
    }
    if (this.lawEffectIdentifier === null) {
      throw new Error('Law effect identifier is required');
    }
    else {
      socialClassHappinessEffect.lawEffectIdentifier = this.lawEffectIdentifier;
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
