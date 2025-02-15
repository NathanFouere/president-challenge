import Choice from '#event/domain/models/choice';

export class ChoiceBuilder {
  private eventId: number | null = null;
  private triggerEventId: number | undefined = undefined;
  private definitionId: number | null = null;
  private gameId: number | null = null;

  public withGameId(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public withDefinitionId(definitionId: number): this {
    this.definitionId = definitionId;
    return this;
  }

  public withEventId(eventId: number | null): this {
    this.eventId = eventId;
    return this;
  }

  public withTriggerEventId(triggerEventId: number | undefined): this {
    this.triggerEventId = triggerEventId;
    return this;
  }

  public build(): Choice {
    const choice = new Choice();
    if (this.eventId !== null) {
      choice.eventId = this.eventId;
    }
    else {
      throw new Error('eventId is required');
    }
    if (this.triggerEventId !== undefined) {
      choice.triggerEventId = this.triggerEventId;
    }
    if (this.definitionId !== null) {
      choice.definitionId = this.definitionId;
    }
    else {
      throw new Error('definitionId is required');
    }
    if (this.gameId !== null) {
      choice.gameId = this.gameId;
    }
    else {
      throw new Error('gameId is required');
    }
    return choice;
  }
}

export function aChoice(): ChoiceBuilder {
  return new ChoiceBuilder();
}
