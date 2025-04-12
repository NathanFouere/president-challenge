import type GameDefinition from '#game/domain/models/game_definition';

export default abstract class IGameDefinitionRepository {
  public abstract save(gameDefinition: GameDefinition): Promise<void>;
  public abstract createMany(gameDefinitions: GameDefinition[]): Promise<void>;
  public abstract findAll(): Promise<GameDefinition[]>;
  public abstract find(identifier: string): Promise<GameDefinition | null>;
  public abstract get(identifier: string): Promise<GameDefinition>;
}
