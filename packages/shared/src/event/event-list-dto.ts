import type { MinimalEventDto } from '@shared/types/event/minimal-event-dto';

export interface EventListDto {
  historicalEvents: MinimalEventDto[];
  choiceEvents: MinimalEventDto[];
  superEvents: MinimalEventDto[];
}
