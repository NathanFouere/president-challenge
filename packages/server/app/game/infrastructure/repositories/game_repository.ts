import Game from '#game/domain/models/game';
import type IGameRepository from '#game/domain/repository/i_game_repository';

export default class GameRepository implements IGameRepository {
  public async save(game: Game): Promise<void> {
    await game.save();
  }

  public async delete(game: Game): Promise<void> {
    await game.delete();
  }

  public async findById(id: number): Promise<Game | null> {
    return Game.find(id);
  }

  public async getById(id: number): Promise<Game> {
    return Game.findOrFail(id);
  }
}
