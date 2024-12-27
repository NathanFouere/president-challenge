import State from '#state/domain/model/state';

export default class StateBuilder {
  private name: string | null = null;
  private description: string | null = null;
  private flagIdentifier: string | null = null;
  private economicalSituation: number | null = null;
  private gameId: number | null = null;

  public withName(name: string): this {
    this.name = name;
    return this;
  }

  public withDescription(description: string): this {
    this.description = description;
    return this;
  }

  public withFlagIdentifier(flagIdentifier: string): this {
    this.flagIdentifier = flagIdentifier;
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

    if (this.name) state.name = this.name;
    else throw new Error('Name is required');
    if (this.description) state.description = this.description;
    else throw new Error('Description is required');
    if (this.flagIdentifier) state.flagIdentifier = this.flagIdentifier;
    else throw new Error('Licensed file identifier is required');
    if (this.economicalSituation) state.economicalSituation = this.economicalSituation;
    else throw new Error('Economical situation is required');
    if (this.gameId) state.gameId = this.gameId;
    else throw new Error('Game id is required');

    return state;
  }
}

export function aState(): StateBuilder {
  return new StateBuilder();
}
