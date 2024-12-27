import type { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import SocialClass from '#social-class/domain/models/social_class';

export class SocialClassRepository {
  public async save(socialClass: SocialClass): Promise<void> {
    await socialClass.save();
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

  public async getByTypeAndGameId(type: SocialClassTypes, gameId: number): Promise<SocialClass> {
    return SocialClass.query().where('type', type).where('game_id', gameId).firstOrFail();
  }
}
