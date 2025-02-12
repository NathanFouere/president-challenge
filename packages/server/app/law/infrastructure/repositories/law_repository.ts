import ILawRepository from '#law/domain/repository/i_law_repository';
import Law from '#law/domain/model/law';

export default class LawRepository extends ILawRepository {
  public async save(law: Law): Promise<void> {
    await law.save();
  }

  public async createMany(laws: Law[]): Promise<void> {
    await Law.createMany(laws);
  }

  public async saveMany(laws: Law[]): Promise<void> {
    const saveLawsPromises = laws.map(law => law.save());
    await Promise.all(saveLawsPromises);
  }

  public async getAll(): Promise<Law[]> {
    return await Law.all();
  }
}
