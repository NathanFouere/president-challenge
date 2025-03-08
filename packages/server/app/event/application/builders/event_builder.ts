import Event from '#event/domain/models/event';

export class EventBuilder {
  private turn: number | null = null;
  private isAvailable: boolean | null = null;
  private gameId: number | null = null;
  private beenRead: boolean | null = null;
  private displayable: boolean | null = null;
  private definitionId: number | null = null;
  private electionId: number | null = null;

  public withDefinitionId(definitionId: number): this {
    this.definitionId = definitionId;
    return this;
  }

  public withDisplayable(displayable: boolean): this {
    this.displayable = displayable;
    return this;
  }

  public withGameId(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public withTurn(turn: number | null): this {
    this.turn = turn;
    return this;
  }

  public withIsAvailable(isAvailable: boolean): this {
    this.isAvailable = isAvailable;
    return this;
  }

  public withBeenRead(beenRead: boolean): this {
    this.beenRead = beenRead;
    return this;
  }

  public withElectionId(electionId: number): this {
    this.electionId = electionId;
    return this;
  }

  public build(): Event {
    const event = new Event();

    if (this.gameId !== null) {
      event.gameId = this.gameId;
    }
    else {
      throw new Error('gameId is required');
    }
    if (this.turn !== null) {
      event.turn = this.turn;
    }
    else {
      throw new Error('turn is required');
    }
    if (this.isAvailable !== null) {
      event.isAvailable = this.isAvailable;
    }
    else {
      throw new Error('isAvailable is required');
    }
    if (this.beenRead !== null) {
      event.beenRead = this.beenRead;
    }
    else {
      throw new Error('beenRead is required');
    }
    if (this.displayable !== null) {
      event.isDisplayable = this.displayable;
    }
    else {
      throw new Error('displayable is required');
    }
    if (this.definitionId !== null) {
      event.definitionId = this.definitionId;
    }
    else {
      throw new Error('definitionId is required');
    }
    if (this.electionId !== null) {
      event.electionId = this.electionId;
    }
    return event;
  }
}

export function anEvent(): EventBuilder {
  return new EventBuilder();
}
