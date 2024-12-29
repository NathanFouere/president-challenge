import SectorEconomicalSituationPerTurn from '#sector/domain/model/sector_economical_situation_per_turn';
import type ISectorEconomicalSituationPerTurnRepository
  from '#sector/domain/repository/i_sector_economical_situation_per_turn_repository';

export default class SectorEconomicalSituationPerTurnRepository implements ISectorEconomicalSituationPerTurnRepository {
  public async save(sector: SectorEconomicalSituationPerTurn): Promise<void> {
    await sector.save();
  }

  public async findById(id: number): Promise<SectorEconomicalSituationPerTurn | null> {
    return await SectorEconomicalSituationPerTurn.find(id);
  }

  public async findAll(): Promise<SectorEconomicalSituationPerTurn[]> {
    return await SectorEconomicalSituationPerTurn.all();
  }

  public async delete(sector: SectorEconomicalSituationPerTurn): Promise<void> {
    await sector.delete();
  }

  public async createMany(sectors: SectorEconomicalSituationPerTurn[]): Promise<void> {
    await SectorEconomicalSituationPerTurn.createMany(sectors);
  }
}
