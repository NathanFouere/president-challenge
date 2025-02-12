import type LawCategory from '#law/domain/model/law_category';

export default abstract class ILawCategoryRepository {
  public abstract save(lawCategory: LawCategory): Promise<void>;
  public abstract createMany(lawCategories: LawCategory[]): Promise<void>;
  public abstract getAll(): Promise<LawCategory[]>;
}
