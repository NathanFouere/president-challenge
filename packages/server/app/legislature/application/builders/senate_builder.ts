import Senate from '#legislature/domain/models/senate';

export class SenateBuilder {
  public gameId: number | null = null;

  public withGameId(gameId: number): this {
    this.gameId = gameId;
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
