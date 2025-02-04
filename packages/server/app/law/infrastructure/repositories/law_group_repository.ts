import ILawGroupRepository from '#law/domain/repository/i_law_group_repository';
import LawGroup from '#law/domain/model/law_group';

export default class LawGroupRepository extends ILawGroupRepository {
  public async save(lawGroup: LawGroup): Promise<void> {
    await lawGroup.save();
  }

  public async createMany(lawGroups: LawGroup[]): Promise<void> {
    await LawGroup.createMany(lawGroups);
  }
}
