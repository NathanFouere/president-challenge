import type Game from '#game/domain/models/game';
import Senate from '#legislature/domain/models/senate';

export class SenateBuilder {
  public gameId: number | null = null;

  public withGameId(game: Game): this {
    this.gameId = game;
    return this;
  }

  public build(): Senate {
    const senate = new Senate();
    if (this.gameId !== null) {
      senate.gameId = this.gameId;
    }
    else {
      throw new Error('game is required');
    }
    return senate;
  }
}

export function aSenate(): SenateBuilder {
  return new SenateBuilder();
}
