import type PropertyLaw from '#legislature/domain/models/property_law';

export default abstract class IPropertyLawRepository {
  public abstract save(propertyLaw: PropertyLaw): Promise<void>;

  public abstract createMany(propertyLaws: PropertyLaw[]): Promise<void>;
}
