import Sector from '#sector/domain/model/sector';
import type ISectorRepository from '#sector/domain/repository/i_sector_repository';

export default class SectorRepository implements ISectorRepository {
  public async save(sector: Sector): Promise<void> {
    await sector.save();
  }

  public async saveMany(sectors: Sector[]): Promise<void> {
    const promises = sectors.map(sector => this.save(sector));
    await Promise.all(promises);
  }

  public async findById(id: number): Promise<Sector | null> {
    return Sector.find(id);
  }

  public async findAll(): Promise<Sector[]> {
    return Sector.all();
  }

  public async delete(sector: Sector): Promise<void> {
    await sector.delete();
  }

  public async createMany(sectors: Sector[]): Promise<void> {
    await Sector.createMany(sectors);
  }
}
