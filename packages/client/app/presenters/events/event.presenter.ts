import { injectable } from 'inversify';
import { useCustomToast } from '../../composables/useCustomToast';
import type EventModule from '../../../server/repository/modules/event.module';
import { useGameStore } from '../../store/game/game.store';
import { useEventStore } from '../../store/events/event.store';

@injectable()
export class EventPresenter {
  private readonly toast = useCustomToast();
  private readonly eventModule: EventModule = useNuxtApp().$api.event;
  public readonly gameStore = useGameStore();
  public readonly eventStore = useEventStore();

  public async getEvent(eventId: number): Promise<void> {
    console.log('Getting event...');
    this.eventStore.setGettingEvent();
    try {
      const event = await this.eventModule.getEvent(eventId, this.gameStore.getSelectedGameId);
      this.eventStore.setEvent(event);

      this.eventStore.unsetGettingEvent();
      this.eventStore.unsetErrorOnGettingEvent();
    }
    catch (error) {
      this.toast.showError('Failed to fetch event');
      this.eventStore.setErrorOnGettingEvent();
    }
  }
}
