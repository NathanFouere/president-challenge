import type SectorEconomicalSituationPerTurn from '#sector/domain/model/sector_economical_situation_per_turn';

export default abstract class ISectorEconomicalSituationPerTurnRepository {
  public abstract save(sectorEconomicalSituationPerTurn: SectorEconomicalSituationPerTurn): Promise<void>;
  public abstract findById(id: number): Promise<SectorEconomicalSituationPerTurn | null>;
  public abstract findAll(): Promise<SectorEconomicalSituationPerTurn[]>;
  public abstract delete(sectorEconomicalSituationPerTurn: SectorEconomicalSituationPerTurn): Promise<void>;
  public abstract createMany(sectors: SectorEconomicalSituationPerTurn[]): Promise<void>;
}
