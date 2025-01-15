import ILawRepository from '#legislature/domain/repository/i_law_repository';
import Law from '#legislature/domain/models/law';

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
}
