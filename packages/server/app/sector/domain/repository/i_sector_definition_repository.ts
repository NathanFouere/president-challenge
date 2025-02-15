import type SectorDefinition from '#sector/domain/model/sector_definition';

export default abstract class ISectorDefinitionRepository {
  public abstract save(sector: SectorDefinition): Promise<void>;
  public abstract findById(id: number): Promise<SectorDefinition | null>;
  public abstract findAll(): Promise<SectorDefinition[]>;
  public abstract delete(sector: SectorDefinition): Promise<void>;
  public abstract createMany(sectors: SectorDefinition[]): Promise<void>;
}
