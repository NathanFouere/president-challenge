import type { ChoiceStatus } from '@shared/types/event/choice-status.js';
import type { EventStartupInterface } from '#event/infrastructure/startup/event_startup_interface';

export interface ChoiceStartupInterface {
  text: string;
  status: ChoiceStatus;
  event: EventStartupInterface;
  triggerEventIdentifier: string;
}
