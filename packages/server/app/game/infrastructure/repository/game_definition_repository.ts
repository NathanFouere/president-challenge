import IGameDefinitionRepository from '#game/domain/repository/i_game_definition_repository';
import GameDefinition from '#game/domain/models/game_definition';

export default class GameDefinitionRepository extends IGameDefinitionRepository {
  public async save(gameDefinition: GameDefinition): Promise<void> {
    await gameDefinition.save();
  }

  public async createMany(gameDefinitions: GameDefinition[]): Promise<void> {
    await GameDefinition.createMany(gameDefinitions);
  }

  public async findAll(): Promise<GameDefinition[]> {
    return await GameDefinition.all();
  }

  public async find(identifier: string): Promise<GameDefinition | null> {
    return await GameDefinition.find(identifier);
  }

  public async get(identifier: string): Promise<GameDefinition> {
    const gameDefinition = await this.find(identifier);

    if (!gameDefinition) {
      throw new Error(`Game Definition with identifier ${identifier} not found`);
    }

    return gameDefinition;
  }
}
