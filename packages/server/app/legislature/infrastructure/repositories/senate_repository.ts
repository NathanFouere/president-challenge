import Senate from '#legislature/domain/models/senate';

export class SenateRepository {
  public async save(senate: Senate): Promise<void> {
    senate.save();
  }

  public async findById(id: number): Promise<Senate | null> {
    return await Senate.find(id);
  }

  public async getById(id: number): Promise<Senate> {
    const senate = await this.findById(id);

    if (senate === null) {
      throw new Error(`Senate with id ${id} not found`);
    }

    return senate;
  }

  public async getAll(): Promise<Senate[]> {
    return await Senate.all();
  }

  public async remove(senate: Senate): Promise<void> {
    await senate.delete();
  }
}
