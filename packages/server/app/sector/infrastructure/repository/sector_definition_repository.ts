import type ISectorDefinitionRepository from '#sector/domain/repository/i_sector_definition_repository';
import SectorDefinition from '#sector/domain/model/sector_definition';

export default class SectorRepository implements ISectorDefinitionRepository {
  public async save(sector: SectorDefinition): Promise<void> {
    await sector.save();
  }

  public async saveMany(sectors: SectorDefinition[]): Promise<void> {
    const promises = sectors.map(sector => this.save(sector));
    await Promise.all(promises);
  }

  public async findById(id: number): Promise<SectorDefinition | null> {
    return SectorDefinition.find(id);
  }

  public async findAll(): Promise<SectorDefinition[]> {
    return SectorDefinition.all();
  }

  public async delete(sector: SectorDefinition): Promise<void> {
    await sector.delete();
  }

  public async createMany(sectors: SectorDefinition[]): Promise<void> {
    await SectorDefinition.createMany(sectors);
  }
}
