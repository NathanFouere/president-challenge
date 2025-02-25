import type SocialClassTypeLawHappinessEffect from '#social-class/domain/models/social_class_type_law_happiness_effect';

export default abstract class ISocialClassLawHappinessEffectRepository {
  public abstract createMany(socialClassLawHappinessEffects: SocialClassTypeLawHappinessEffect[]): Promise<void>;
  public abstract getById(id: string): Promise<SocialClassTypeLawHappinessEffect>;
  public abstract findById(id: string): Promise<SocialClassTypeLawHappinessEffect | null>;
}
