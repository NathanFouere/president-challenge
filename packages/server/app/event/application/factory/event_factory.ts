import { anEvent } from '#event/application/builders/event_builder';
import type Event from '#event/domain/models/event';

export default class EventFactory {
  public createEventForGameAtTurn(eventDefinitionId: number, gameId: number, turn: number): Event {
    return anEvent()
      .withTurn(turn)
      .withDefinitionId(eventDefinitionId)
      .withIsAvailable(true)
      .withBeenRead(false)
      .withDisplayable(true)
      .withGameId(gameId)
      .build();
  }

  public createEventFromElection(eventDefinitionId: number, gameId: number, turn: number, electionId: number): Event {
    return anEvent()
      .withTurn(turn)
      .withDefinitionId(eventDefinitionId)
      .withIsAvailable(true)
      .withBeenRead(false)
      .withDisplayable(true)
      .withGameId(gameId)
      .withElectionId(electionId)
      .build();
  }
}
