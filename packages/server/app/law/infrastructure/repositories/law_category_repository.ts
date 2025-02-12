import ILawCategoryRepository from '#law/domain/repository/i_law_category_repository';
import LawCategory from '#law/domain/model/law_category';

export default class LawCategoryRepository extends ILawCategoryRepository {
  public async save(lawCategory: LawCategory): Promise<void> {
    await lawCategory.save();
  }

  public async createMany(lawCategories: LawCategory[]): Promise<void> {
    await LawCategory.createMany(lawCategories);
  }

  public async getAll(): Promise<LawCategory[]> {
    return await LawCategory
      .query()
      .preload('lawGroups')
      .exec();
  }
}
