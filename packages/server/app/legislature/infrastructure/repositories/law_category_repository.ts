import ILawCategoryRepository from '#legislature/domain/repository/i_law_category_repository';
import LawCategory from '#legislature/domain/models/law_category';

export default class LawCategoryRepository extends ILawCategoryRepository {
  public async save(lawCategory: LawCategory): Promise<void> {
    await lawCategory.save();
  }

  public async createMany(lawCategories: LawCategory[]): Promise<void> {
    await LawCategory.createMany(lawCategories);
  }
}
