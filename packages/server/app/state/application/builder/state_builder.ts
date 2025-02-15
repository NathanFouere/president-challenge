import State from '#state/domain/model/state';

export default class StateBuilder {
  private economicalSituation: number | null = null;
  private gameId: number | null = null;
  private definitionId: number | null = null;

  public withDefinitionId(definitionId: number): this {
    this.definitionId = definitionId;
    return this;
  }

  public withEconomicalSituation(economicalSituation: number): this {
    this.economicalSituation = economicalSituation;
    return this;
  }

  public withGameId(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public build(): State {
    const state = new State();

    if (this.economicalSituation) state.economicalSituation = this.economicalSituation;
    else throw new Error('Economical situation is required');
    if (this.gameId) state.gameId = this.gameId;
    else throw new Error('Game id is required');
    if (this.definitionId) state.definitionId = this.definitionId;
    else throw new Error('Definition id is required');

    return state;
  }
}

export function aState(): StateBuilder {
  return new StateBuilder();
}
