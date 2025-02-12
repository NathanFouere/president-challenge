import SocialClassLawHappinessEffect from '#social-class/domain/models/social_class_law_happiness_effect';
import type ISocialClassLawHappinessEffectRepository
  from '#social-class/domain/repository/i_social_class_law_happiness_effect_repository';

export default class SocialClassLawHappinessEffectRepository implements ISocialClassLawHappinessEffectRepository {
  public async findById(id: string): Promise<SocialClassLawHappinessEffect | null> {
    return await SocialClassLawHappinessEffect.find(id);
  }

  public async getById(id: string): Promise<SocialClassLawHappinessEffect> {
    const socialClassLawHappinessEffect = await this.findById(id);
    if (socialClassLawHappinessEffect === null) {
      throw new Error(`SocialClassLawHappinessEffect with id ${id} not found`);
    }

    return socialClassLawHappinessEffect;
  }

  public async createMany(socialClassLawHappinessEffects: SocialClassLawHappinessEffect[]): Promise<void> {
    await SocialClassLawHappinessEffect.createMany(socialClassLawHappinessEffects);
  }
}
