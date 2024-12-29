import type { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';
import type SocialClass from '#social-class/domain/models/social_class';

export default abstract class ISocialClassRepository {
  public abstract save(socialClass: SocialClass): Promise<void>;
  public abstract delete(socialClass: SocialClass): Promise<void>;
  public abstract createMany(socialClasses: SocialClass[]): Promise<void>;
  public abstract saveWithLicensedFiles(socialClass: SocialClass, licensedFilesIdentifiers: string[]): Promise<void>;
  public abstract getByTypeAndGameId(type: SocialClassTypes, gameId: number): Promise<SocialClass>;
}
