import type SocialClassHappinessModifier from '#social-class/domain/models/social_class_happiness_modifier';

export default abstract class ISocialClassHappinessModifierRepository {
  public abstract save(socialClassHappinessModifier: SocialClassHappinessModifier): Promise<void>;
  public abstract delete(socialClassHappinessModifier: SocialClassHappinessModifier): Promise<void>;
  public abstract saveMany(socialClassHappinessModifiers: SocialClassHappinessModifier[]): Promise<void>;
}
