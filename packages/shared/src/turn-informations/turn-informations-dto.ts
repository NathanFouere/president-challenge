import type { EventListDto } from '@shared/event/event-list-dto.js';

export interface TurnInformationsDto {
  eventListDto: EventListDto;
  maxTurnReached: boolean;
  eventNeedToBeAddress: boolean;
  defeat: boolean;
}
