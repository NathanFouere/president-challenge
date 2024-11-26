import Game from '#game/domain/models/game';

export default class GameRepository {
  public async save(game: Game): Promise<void> {
    await game.save();
  }

  public async delete(game: Game): Promise<void> {
    await game.delete();
  }

  public async findById(id: number): Promise<Game | null> {
    return Game.find(id);
  }
}
