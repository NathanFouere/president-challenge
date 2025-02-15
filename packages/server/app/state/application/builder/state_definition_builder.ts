import StateDefinition from '#state/domain/model/state_definition';

export default class StateDefinitionBuilder {
  private name: string | null = null;
  private description: string | null = null;
  private flagIdentifier: string | null = null;
  private economicalSituation: number | null = null;

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

  public build(): StateDefinition {
    const state = new StateDefinition();

    if (this.name) state.name = this.name;
    else throw new Error('Name is required');
    if (this.description) state.description = this.description;
    else throw new Error('Description is required');
    if (this.flagIdentifier) state.flagIdentifier = this.flagIdentifier;
    else throw new Error('Licensed file identifier is required');
    if (this.economicalSituation) state.defaultEconomicalSituation = this.economicalSituation;
    else throw new Error('Economical situation is required');

    return state;
  }
}

export function aStateDefinition(): StateDefinitionBuilder {
  return new StateDefinitionBuilder();
}
