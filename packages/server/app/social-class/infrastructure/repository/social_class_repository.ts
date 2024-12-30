import type { SocialClassSubtypes } from '../../../../../shared/src/social-class/social-class-subtypes.js';
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

  public async saveWithLicensedFiles(socialClass: SocialClass, licensedFilesIdentifiers: string[]): Promise<void> {
    await socialClass.save();
    socialClass.related('licensedFiles').attach(licensedFilesIdentifiers);
  }

  public async getByTypeAndGameId(type: SocialClassSubtypes, gameId: number): Promise<SocialClass> {
    return SocialClass.query().where('type', type).where('game_id', gameId).firstOrFail();
  }
}
