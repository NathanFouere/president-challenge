import type Game from '#game/domain/models/game';

export default abstract class IGameRepository {
  public abstract save(game: Game): Promise<void>;
  public abstract delete(game: Game): Promise<void>;
  public abstract findById(id: number): Promise<Game | null>;
  public abstract getById(id: number): Promise<Game>;
}
