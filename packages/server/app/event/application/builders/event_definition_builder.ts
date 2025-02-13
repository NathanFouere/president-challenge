import type { EventType } from '@shared/dist/event/event-type.js';
import EventDefinition from '#event/domain/models/event_definition';

export class EventDefinitionBuilder {
  private identifier: string | null = null;
  private text: string | null = null;
  private title: string | null = null;
  private turn: number | null = null;
  private isAvailableByDefault: boolean | null = null;
  private displayable: boolean | null = null;
  private type: EventType | null = null;

  public withIdentifier(identifier: string): this {
    this.identifier = identifier;
    return this;
  }

  public withType(type: EventType): this {
    this.type = type;
    return this;
  }

  public withDisplayable(displayable: boolean): this {
    this.displayable = displayable;
    return this;
  }

  public withTitle(title: string): this {
    this.title = title;
    return this;
  }

  public withText(text: string): this {
    this.text = text;
    return this;
  }

  public withTurn(turn: number): this {
    this.turn = turn;
    return this;
  }

  public withIsAvailableByDefault(isAvailable: boolean): this {
    this.isAvailableByDefault = isAvailable;
    return this;
  }

  public build(): EventDefinition {
    const event = new EventDefinition();
    if (this.identifier !== null) {
      event.identifier = this.identifier;
    }
    else {
      throw new Error('identifier is required');
    }
    if (this.text !== null) {
      event.text = this.text;
    }
    else {
      throw new Error('text is required');
    }
    if (this.turn !== null) {
      event.turn = this.turn;
    }
    else {
      throw new Error('turn is required');
    }
    if (this.title !== null) {
      event.title = this.title;
    }
    else {
      throw new Error('title is required');
    }
    if (this.displayable !== null) {
      event.isDisplayableByDefault = this.displayable;
    }
    else {
      throw new Error('displayable is required');
    }
    if (this.type !== null) {
      event.type = this.type;
    }
    else {
      throw new Error('type is required');
    }
    if (this.isAvailableByDefault !== null) {
      event.isAvailableByDefault = this.isAvailableByDefault;
    }
    else {
      throw new Error('isAvailableByDefault is required');
    }
    return event;
  }
}

export function anEventDefinition(): EventDefinitionBuilder {
  return new EventDefinitionBuilder();
}
