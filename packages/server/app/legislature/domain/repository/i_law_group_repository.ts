import type LawGroup from '#legislature/domain/models/law_group';

export default abstract class ILawGroupRepository {
  public abstract save(lawGroup: LawGroup): Promise<void>;

  public abstract createMany(lawGroups: LawGroup[]): Promise<void>;
}
