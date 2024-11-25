import Game from '#game/domain/models/game';

export class GameBuilder {
  public id: number | null = null;
  public turnNumber: number | null = null;
  public userId: number | null = null;

  public withTurnNumber(turnNumber: number): GameBuilder {
    this.turnNumber = turnNumber;
    return this;
  }

  public withUserId(userId: number): GameBuilder {
    this.userId = userId;
    return this;
  }

  public build(): Game {
    const game = new Game();
    if (this.turnNumber !== null) {
      game.turnNumber = this.turnNumber;
    }
    else {
      throw new Error('turnNumber is required');
    }
    if (this.userId !== null) {
      game.userId = this.userId;
    }
    else {
      throw new Error('userId is required');
    }
    return game;
  }
}

export function aGame(): GameBuilder {
  return new GameBuilder();
}
