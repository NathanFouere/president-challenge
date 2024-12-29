import type { Parliament } from '#legislature/domain/models/parliament';

export default abstract class IParliamentRepository {
  public abstract save(parliament: Parliament): Promise<void>;

  public abstract findById(parliamentId: number): Promise<Parliament | null>;

  public abstract getByGameId(gameId: number): Promise<Parliament>;

  public abstract getById(id: number): Promise<Parliament>;

  public abstract getAll(): Promise<Parliament[]>;

  public abstract remove(parliament: Parliament): Promise<void>;
}
