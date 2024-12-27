import type { EventType } from '@shared/dist//types/event/event-type.js';
import type { ChoiceStartupInterface } from '#event/infrastructure/startup/choice_startup_interface';

export interface EventStartupInterface {
  identifier: string;
  title: string;
  text: string;
  turn: number;
  isAvailable: boolean;
  isDisplayable: boolean;
  type: EventType;
  licensedFilesIdentifiers: string[];
  childEvents?: EventStartupInterface[];
  choices?: ChoiceStartupInterface[];
}
