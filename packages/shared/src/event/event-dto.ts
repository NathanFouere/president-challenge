import type { MinimalEventDto } from '@shared/types/event/minimal-event-dto';
import type { ChoiceDto } from '@shared/types/event/choice-dto';

export interface EventDto extends MinimalEventDto {
  choices: ChoiceDto[];
}
