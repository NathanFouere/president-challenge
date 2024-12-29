import { Parliament } from '#legislature/domain/models/parliament';
import type IParliamentRepository from '#legislature/domain/repository/i_parliament_repository';

export default class ParliamentRepository implements IParliamentRepository {
  public async save(parliament: Parliament): Promise<void> {
    parliament.save();
  }

  public async getByGameId(gameId: number): Promise<Parliament> {
    return await Parliament.query().where('game_id', gameId).firstOrFail();
  }

  public async findById(id: number): Promise<Parliament | null> {
    return await Parliament.find(id);
  }

  public async getById(id: number): Promise<Parliament> {
    const parliament = await this.findById(id);

    if (parliament === null) {
      throw new Error(`Parliament with id ${id} not found`);
    }

    return parliament;
  }

  public async getAll(): Promise<Parliament[]> {
    return await Parliament.all();
  }

  public async remove(parliament: Parliament): Promise<void> {
    await parliament.delete();
  }
}
