import ChoiceDefinition from '#event/domain/models/choice_definition';

export class ChoiceDefinitionBuilder {
  private text: string | null = null;
  private eventDefinitionId: number | null = null;
  private triggerEventDefinitionId: number | null = null;

  public withText(text: string): this {
    this.text = text;
    return this;
  }

  public withEventDefinitionId(eventId: number | null): this {
    this.eventDefinitionId = eventId;
    return this;
  }

  public withTriggerEventDefinitionId(triggerEventId: number | null): this {
    this.triggerEventDefinitionId = triggerEventId;
    return this;
  }

  public async build(): Promise<ChoiceDefinition> {
    const choice = new ChoiceDefinition();
    if (this.text !== null) {
      choice.text = this.text;
    }
    else {
      throw new Error('text is required');
    }
    if (this.eventDefinitionId !== null) {
      choice.eventDefinitionId = this.eventDefinitionId;
    }
    else {
      throw new Error('eventId is required');
    }
    if (this.triggerEventDefinitionId !== null) {
      choice.triggerEventDefinitionId = this.triggerEventDefinitionId;
    }
    return choice;
  }
}

export function aChoiceDefinition(): ChoiceDefinitionBuilder {
  return new ChoiceDefinitionBuilder();
}
