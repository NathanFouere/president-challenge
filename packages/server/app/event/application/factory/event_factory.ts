import { anEvent } from '#event/application/builders/event_builder';
import type Event from '#event/domain/models/event';

export default class EventFactory {
  public createAvailableEventForTurn(eventDefinitionId: number, gameId: number, turn: number): Event {
    return anEvent()
      .withTurn(turn)
      .withDefinitionId(eventDefinitionId)
      .withIsAvailable(true)
      .withBeenRead(false)
      .withDisplayable(true)
      .withGameId(gameId)
      .build();
  }
}
