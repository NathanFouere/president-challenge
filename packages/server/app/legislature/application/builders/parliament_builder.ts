import { Parliament } from '#legislature/domain/models/parliament';

export class ParliamentBuilder {
  public gameId: number | null = null;

  public withGameId(game: number): this {
    this.gameId = game;
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
    return parliament;
  }
}

export function aParliament(): ParliamentBuilder {
  return new ParliamentBuilder();
}
