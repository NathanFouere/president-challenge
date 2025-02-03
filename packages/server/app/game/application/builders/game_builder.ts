import Game from '#game/domain/models/game';

export class GameBuilder {
  private turn: number | null = null;
  private userId: number | null = null;
  private politicalWeight: number | null = null;

  public withTurn(turn: number): this {
    this.turn = turn;
    return this;
  }

  public withPoliticalWeight(politicalWeight: number): this {
    this.politicalWeight = politicalWeight;
    return this;
  }

  public withUserId(userId: number): this {
    this.userId = userId;
    return this;
  }

  public build(): Game {
    const game = new Game();
    if (this.turn !== null) {
      game.turn = this.turn;
    }
    else {
      throw new Error('turn is required');
    }
    if (this.userId !== null) {
      game.userId = this.userId;
    }
    else {
      throw new Error('userId is required');
    }
    if (this.politicalWeight !== null) {
      game.politicalWeight = this.politicalWeight;
    }
    else {
      throw new Error('politicalWeight is required');
    }

    return game;
  }
}

export function aGame(): GameBuilder {
  return new GameBuilder();
}
