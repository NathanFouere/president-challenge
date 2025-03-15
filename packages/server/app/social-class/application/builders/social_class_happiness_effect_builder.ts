import type { SocialClassTypes } from '@president-challenge/shared/dist/social-class/social-class-types.js';
import type { HappinessModifierType } from '@president-challenge/shared/dist/common/happiness-modifier-type.js';

export default abstract class SocialClassHappinessEffectBuilder {
  protected socialClassType: SocialClassTypes | null = null;
  protected happinessModifier: number | null = null;
  protected duration: number | null = null;
  protected type: HappinessModifierType | null = null;

  public withType(type: HappinessModifierType): this {
    this.type = type;
    return this;
  }

  public withDuration(duration: number | null): this {
    this.duration = duration;
    return this;
  }

  public withSocialClassType(socialClassType: SocialClassTypes): this {
    this.socialClassType = socialClassType;
    return this;
  }

  public withHappinessModifier(happinessModifier: number): this {
    this.happinessModifier = happinessModifier;
    return this;
  }
}
