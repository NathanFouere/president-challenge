import type LawGroup from '#law/domain/model/law_group';

export default abstract class ILawGroupRepository {
  public abstract save(lawGroup: LawGroup): Promise<void>;

  public abstract createMany(lawGroups: LawGroup[]): Promise<void>;
}
