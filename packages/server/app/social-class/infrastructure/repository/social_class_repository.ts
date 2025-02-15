import SocialClass from '#social-class/domain/models/social_class';
import type ISocialClassRepository from '#social-class/domain/repository/i_social_class_repository';

export default class SocialClassRepository implements ISocialClassRepository {
  public async save(socialClass: SocialClass): Promise<void> {
    await socialClass.save();
  }

  public async saveMany(socialClasses: SocialClass[]): Promise<void> {
    const promises = socialClasses.map(socialClass => socialClass.save());
    await Promise.all(promises);
  }

  public async delete(socialClass: SocialClass): Promise<void> {
    await socialClass.delete();
  }

  public async createMany(socialClasses: SocialClass[]): Promise<void> {
    await SocialClass.createMany(socialClasses);
  }
}
