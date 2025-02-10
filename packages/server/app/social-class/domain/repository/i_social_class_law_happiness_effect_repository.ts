import type SocialClassLawHappinessEffect from '#social-class/domain/models/social_class_law_happiness_effect';

export default abstract class ISocialClassLawHappinessEffectRepository {
  public abstract saveOrUpdateAll(socialClassLawHappinessEffects: SocialClassLawHappinessEffect[]): Promise<void>;
  public abstract getById(id: string): Promise<SocialClassLawHappinessEffect>;
  public abstract findById(id: string): Promise<SocialClassLawHappinessEffect | null>;
}
