import type LawCategory from '#legislature/domain/models/law_category';

export default abstract class ILawCategoryRepository {
  public abstract save(lawCategory: LawCategory): Promise<void>;
  public abstract createMany(lawCategories: LawCategory[]): Promise<void>;
}
