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
    try {
      const eventList = await this.eventModule.getEventsOfTurn(this.gameStore.getSelectedGameId, this.gameStore.getSelectedGameTurn);
      this.eventsStore.setChoiceEvents(eventList.choiceEvents);
      this.eventsStore.setHistoricalEvents(eventList.historicalEvents);
      this.eventsStore.setSuperEvents(eventList.superEvents);
    }
    catch (error) {
      this.toast.showError('Error while getting events');
    }
    this.globalLoader.stopLoading();
  }
}
