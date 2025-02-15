import type ISocialClassDefinitionRepository from '#social-class/domain/repository/i_social_class_definition_repository';
import SocialClassDefinition from '#social-class/domain/models/social_class_definition';

export default class SocialClassDefinitionRepository implements ISocialClassDefinitionRepository {
  public async save(socialClass: SocialClassDefinition): Promise<void> {
    await socialClass.save();
  }

  public async saveMany(socialClasses: SocialClassDefinition[]): Promise<void> {
    const promises = socialClasses.map(socialClass => socialClass.save());
    await Promise.all(promises);
  }

  public async delete(socialClass: SocialClassDefinition): Promise<void> {
    await socialClass.delete();
  }

  public async createMany(socialClasses: SocialClassDefinition[]): Promise<void> {
    await SocialClassDefinition.createMany(socialClasses);
  }

  public async getAll(): Promise<SocialClassDefinition[]> {
    return await SocialClassDefinition.all();
  }

  // TODO => will be removed when admin
  public async saveWithLicensedFiles(socialClass: SocialClassDefinition, licensedFilesIdentifiers: string[]): Promise<void> {
    await socialClass.save();
    socialClass.related('licensedFiles').attach(licensedFilesIdentifiers);
  }
}
