import Senate from '#legislature/domain/models/senate';

export class SenateBuilder {
  private gameId: number | null = null;
  private definitionId: number | null = null;

  public withGameId(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public withDefinitionId(definitionId: number): this {
    this.definitionId = definitionId;
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

    if (this.definitionId !== null) {
      senate.definitionId = this.definitionId;
    }
    else {
      throw new Error('definition is required');
    }
    return senate;
  }
}

export function aSenate(): SenateBuilder {
  return new SenateBuilder();
}
