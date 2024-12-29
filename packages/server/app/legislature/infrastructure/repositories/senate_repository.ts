import Senate from '#legislature/domain/models/senate';
import type ISenateRepository from '#legislature/domain/repository/i_senate_repository';

export default class SenateRepository implements ISenateRepository {
  public async findById(id: number): Promise<Senate | null> {
    return await Senate.find(id);
  }

  public async save(senate: Senate): Promise<void> {
    await senate.save();
  }
}
