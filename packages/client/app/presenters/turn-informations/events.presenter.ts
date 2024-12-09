import { injectable } from 'inversify';
import { useCustomToast } from '../../composables/useCustomToast';
import type EventModule from '../../../server/repository/modules/event.module';
import { useGameStore } from '../../store/game/game.store';
import { useEventsStore } from '../../store/events/events.store';
import { useGlobalLoader } from '../../composables/useGlobalLoader';

@injectable()
export class EventsPresenter {
  public readonly router = useRouter();
  public readonly toast = useCustomToast();
  public readonly eventModule: EventModule = useNuxtApp().$api.event;
  private readonly globalLoader = useGlobalLoader();
  public readonly eventsStore = useEventsStore();
  public readonly gameStore = useGameStore();

  public async getEventsOfTurn(): Promise<void> {
    this.globalLoader.startLoading();
    this.eventsStore.setGettingEvents();
    try {
      const events = await this.eventModule.getEventsOfTurn(this.gameStore.getSelectedGameId, this.gameStore.getSelectedGameTurn);
      this.eventsStore.setEvents(events);
    }
    catch (error) {
      this.eventsStore.setErrorOnGettingEvents();
      this.toast.showError('Error while getting events');
    }
    this.globalLoader.stopLoading();
    this.eventsStore.unsetGettingEvents();
  }
}
