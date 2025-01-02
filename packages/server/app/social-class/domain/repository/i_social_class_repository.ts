import type { SocialClassSubtypes } from '@shared/dist/social-class/social-class-subtypes.js';
import type SocialClass from '#social-class/domain/models/social_class';

export default abstract class ISocialClassRepository {
  public abstract save(socialClass: SocialClass): Promise<void>;
  public abstract delete(socialClass: SocialClass): Promise<void>;
  public abstract createMany(socialClasses: SocialClass[]): Promise<void>;
  public abstract saveWithLicensedFiles(socialClass: SocialClass, licensedFilesIdentifiers: string[]): Promise<void>;
  public abstract getByTypeAndGameId(type: SocialClassSubtypes, gameId: number): Promise<SocialClass>;
}
