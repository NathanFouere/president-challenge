import LawDefinition from '#law/domain/model/law_definition';
import ILawDefinitionRepository from '#law/domain/repository/i_law_definition_repository';

export default class LawDefinitionRepository extends ILawDefinitionRepository {
  public async save(law: LawDefinition): Promise<void> {
    await law.save();
  }

  public async createMany(laws: LawDefinition[]): Promise<void> {
    await LawDefinition.createMany(laws);
  }

  public async saveMany(laws: LawDefinition[]): Promise<void> {
    const saveLawsPromises = laws.map(law => law.save());
    await Promise.all(saveLawsPromises);
  }

  public async getAll(): Promise<LawDefinition[]> {
    return await LawDefinition.all();
  }
}
