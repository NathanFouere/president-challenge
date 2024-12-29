import type Sector from '#sector/domain/model/sector';

export default abstract class ISectorRepository {
  public abstract save(sector: Sector): Promise<void>;
  public abstract findById(id: number): Promise<Sector | null>;
  public abstract findAll(): Promise<Sector[]>;
  public abstract delete(sector: Sector): Promise<void>;
  public abstract createMany(sectors: Sector[]): Promise<void>;
}
