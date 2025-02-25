import type ISocialClassHappinessModifierRepository
  from '#social-class/domain/repository/i_social_class_happiness_modifier_repository';
import type SocialClassHappinessModifier from '#social-class/domain/models/social_class_happiness_modifier';

export default class SocialClassHappinessModifierRepository implements ISocialClassHappinessModifierRepository {
  public async save(socialClassHappinessModifier: SocialClassHappinessModifier): Promise<void> {
    await socialClassHappinessModifier.save();
  }

  public async saveMany(socialClassHappinessModifiers: SocialClassHappinessModifier[]): Promise<void> {
    const promises = socialClassHappinessModifiers.map(socialClassHappinessModifier => socialClassHappinessModifier.save());
    await Promise.all(promises);
  }

  public async delete(socialClassHappinessModifier: SocialClassHappinessModifier): Promise<void> {
    await socialClassHappinessModifier.delete();
  }

  public async createMany(socialClassHappinessModifiers: SocialClassHappinessModifier[]): Promise<void> {
    const promises = socialClassHappinessModifiers.map(socialClassHappinessModifier => socialClassHappinessModifier.save());
    await Promise.all(promises);
  }
}
