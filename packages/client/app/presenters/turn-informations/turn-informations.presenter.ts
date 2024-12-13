import { injectable } from 'inversify';
import { useCustomToast } from '../../composables/useCustomToast';
import { useGlobalLoader } from '../../composables/useGlobalLoader';
import { useGameStore } from '../../store/game/game.store';
import type GameModule from '../../../server/repository/modules/game.module';
import { useEventsStore } from '../../store/events/events.store';
import type EventModule from '../../../server/repository/modules/event.module';
import { usePageTitle } from '../../composables/usePageTitle';

@injectable()
export class TurnInformationsPresenter {
  public readonly router = useRouter();
  public readonly toast = useCustomToast();
  public readonly gameModule: GameModule = useNuxtApp().$api.game;
  public readonly eventModule: EventModule = useNuxtApp().$api.event;
  private readonly globalLoader = useGlobalLoader();
  public readonly gameStore = useGameStore();
  public readonly eventsStore = useEventsStore();
  public readonly pageTitle = usePageTitle();

  public async changeTurn(): Promise<void> {
    this.globalLoader.startLoading();
    try {
      const updatedGame = await this.gameModule.changeTurn(this.gameStore.getSelectedGameId);
      this.gameStore.setSelectedGame(updatedGame);
      console.log(updatedGame);
      await this.getEventsOfTurn();
    }
    catch (error) {
      this.toast.showError('Error while changing turn');
    }
    this.globalLoader.stopLoading();
  }

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
