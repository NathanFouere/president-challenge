import ISocialClassLawHappinessEffect from '#social-class/domain/repository/i_social_class_law_happiness_effect';
import SocialClassLawHappinessEffect from '#social-class/domain/models/social_class_law_happiness_effect';
import ISocialClassLawHappinessEffectRepository
  from '#social-class/domain/repository/i_social_class_law_happiness_effect';

export default class SocialClassLawHappinessEffectRepository extends ISocialClassLawHappinessEffectRepository {
  public async findById(id: number): Promise<SocialClassLawHappinessEffect | null> {
    return await SocialClassLawHappinessEffect.find(id);
  }

  public async getById(id: number): Promise<SocialClassLawHappinessEffect> {
    const socialClassLawHappinessEffect = await this.findById(id);
    if (socialClassLawHappinessEffect === null) {
      throw new Error(`SocialClassLawHappinessEffect with id ${id} not found`);
    }

    return socialClassLawHappinessEffect;
  }

  public async saveOrUpdateAll(socialClassLawHappinessEffects: SocialClassLawHappinessEffect[]): Promise<void> {
    for (const socialClassLawHappinessEffect of socialClassLawHappinessEffects) {
      const existingEffect = await this.findById(socialClassLawHappinessEffect.id);

      if (existingEffect) {
        existingEffect.merge(socialClassLawHappinessEffect.$attributes);
        await existingEffect.save();
      }
      else {
        await socialClassLawHappinessEffect.save();
      }
    }
  }
}
