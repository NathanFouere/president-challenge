import type SocialClassDefinition from '#social-class/domain/models/social_class_definition';

export default abstract class ISocialClassDefinitionRepository {
  public abstract save(socialClass: SocialClassDefinition): Promise<void>;
  public abstract delete(socialClass: SocialClassDefinition): Promise<void>;
  public abstract createMany(socialClasses: SocialClassDefinition[]): Promise<void>;
  public abstract getAll(): Promise<SocialClassDefinition[]>;
}
