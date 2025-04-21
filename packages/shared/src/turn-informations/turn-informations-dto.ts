import type { EventListDto } from '@president-challenge/shared/event/event-list-dto.js';

export interface TurnInformationsDto {
  eventListDto: EventListDto;
  canChangeTurnContext: string;
  canChangeTurn: boolean;
}
