import { Parliament } from '#legislature/domain/models/parliament';

export class ParliamentBuilder {
  private gameId: number | null = null;
  private definitionId: number | null = null;

  public withGameId(game: number): this {
    this.gameId = game;
    return this;
  }

  public withDefinitionId(definition: number): this {
    this.definitionId = definition;
    return this;
  }

  public build(): Parliament {
    const parliament = new Parliament();
    if (this.gameId !== null) {
      parliament.gameId = this.gameId;
    }
    else {
      throw new Error('game is required');
    }
    if (this.definitionId !== null) {
      parliament.definitionId = this.definitionId;
    }
    else {
      throw new Error('definition is required');
    }
    return parliament;
  }
}

export function aParliament(): ParliamentBuilder {
  return new ParliamentBuilder();
}
