import Choice from '#event/domain/models/choice';

export class ChoiceBuilder {
  private text: string | null = null;
  private eventId: number | null = null;

  public withText(text: string): this {
    this.text = text;
    return this;
  }

  public withEventId(eventId: number): this {
    this.eventId = eventId;
    return this;
  }

  public async build(): Promise<Choice> {
    const choice = new Choice();
    if (this.text !== null) {
      choice.text = this.text;
    }
    else {
      throw new Error('text is required');
    }
    if (this.eventId !== null) {
      choice.eventId = this.eventId;
    }
    else {
      throw new Error('eventId is required');
    }
    return choice;
  }
}

export function aChoice(): ChoiceBuilder {
  return new ChoiceBuilder();
}
