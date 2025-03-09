import { injectable } from 'inversify';
import type GameModule from '../../../server/repository/modules/game.module';
import { useCustomToast } from '~/composables/useCustomToast';
import { useGameStore } from '~/store/game/game.store';
import { useEventsStore } from '~/store/events/events.store';
import { useTurnInformationsStore } from '~/store/turn-informations/turn-informations.store';

@injectable()
export class TurnInformationsPresenter {
  public readonly toast = useCustomToast();
  public readonly gameModule: GameModule = useNuxtApp().$api.game;
  public readonly turnInformationsStore = useTurnInformationsStore();
  public readonly gameStore = useGameStore();
  public readonly eventsStore = useEventsStore();

  public async changeTurn(): Promise<void> {
    this.gameStore.setChangingTurn();
    try {
      const updatedGame = await this.gameModule.changeTurn(this.gameStore.getSelectedGameId);
      this.gameStore.setSelectedGame(updatedGame);
      await this.getEventsOfTurn();
    }
    catch {
      this.toast.showError(`Error while changing turn`);
    }
    this.gameStore.unsetChangingTurn();
  }

  public async getEventsOfTurn(): Promise<void> {
    this.eventsStore.setGettingEvents();
    try {
      const turnInformations = await this.gameModule.getTurnInformations(this.gameStore.getSelectedGameId, this.gameStore.getSelectedGameTurn);
      this.eventsStore.setChoiceEvents(turnInformations.eventListDto.choiceEvents);
      this.eventsStore.setHistoricalEvents(turnInformations.eventListDto.commonEvents);
      this.eventsStore.setSuperEvents(turnInformations.eventListDto.superEvents);
      this.turnInformationsStore.setMaxTurnReached(turnInformations.maxTurnReached);
      this.turnInformationsStore.setEventNeedToBeAddress(turnInformations.eventNeedToBeAddress);
      this.turnInformationsStore.setDefeat(turnInformations.defeat);
    }
    catch {
      this.toast.showError('Error while getting events');
    }
    this.eventsStore.unsetGettingEvents();
  }
}
