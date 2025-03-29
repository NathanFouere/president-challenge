import { injectable, inject } from 'inversify';
import { useCustomToast } from '../../composables/useCustomToast';
import type EventModule from '../../../server/repository/modules/event.module';
import { useGameStore } from '../../store/game/game.store';
import { useEventStore } from '../../store/events/event.store';
import { COMMON_DEPENDANCY_TYPES } from '../../../config/common.types';
import type { TurnInformationsPresenter } from '../turn-informations/turn-informations.presenter';

@injectable()
export class EventPresenter {
  constructor(
      @inject(COMMON_DEPENDANCY_TYPES.TurnInformationsPresenter)
      private readonly turnInformationsPresenter: TurnInformationsPresenter,
  ) {
  }

  private readonly toast = useCustomToast();
  private readonly eventModule: EventModule = useNuxtApp().$api.event;
  public readonly gameStore = useGameStore();
  public readonly eventStore = useEventStore();

  public async getEvent(eventId: number): Promise<void> {
    this.eventStore.setGettingEvent();
    try {
      const event = await this.eventModule.getEvent(eventId, this.gameStore.getSelectedGameId);
      this.eventStore.setEvent(event);
      this.eventStore.unsetGettingEvent();
      this.eventStore.unsetErrorOnGettingEvent();
    }
    catch {
      this.toast.showError('Failed to fetch event');
      this.eventStore.setErrorOnGettingEvent();
    }
  }

  public async chooseChoice(eventId: number, choiceId: number): Promise<void> {
    this.eventStore.setLoadingChoiceId(choiceId);
    try {
      await this.eventModule.chooseChoice(eventId, choiceId);
      await this.turnInformationsPresenter.getTurnInformations();
      await this.getEvent(eventId);
    }
    catch {
      this.toast.showError('Failed to choose choice');
    }
    this.eventStore.unsetLoadingChoiceId();
  }
}
