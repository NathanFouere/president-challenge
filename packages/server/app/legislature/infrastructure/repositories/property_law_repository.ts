import PropertyLaw from '#legislature/domain/models/property_law';
import IPropertyLawRepository from '#legislature/domain/repository/i_property_law_repository';

export default class PropertyLawRepository extends IPropertyLawRepository {
  public async save(propertyLaw: PropertyLaw): Promise<void> {
    await propertyLaw.save();
  }

  public async createMany(propertyLaws: PropertyLaw[]): Promise<void> {
    await PropertyLaw.createMany(propertyLaws);
  }
}
