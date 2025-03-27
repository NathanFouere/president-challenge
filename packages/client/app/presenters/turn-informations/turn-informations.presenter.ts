import { injectable } from 'inversify';
import type { GameTurnProcessStreamData } from '@president-challenge/shared/dist/game/game-turn-process-stream-container';

import type { Subscription } from '@adonisjs/transmit-client';
import type GameModule from '../../../server/repository/modules/game.module';
import { useCustomToast } from '~/composables/useCustomToast';
import { useGameStore } from '~/store/game/game.store';
import { useEventsStore } from '~/store/events/events.store';
import { useTurnInformationsStore } from '~/store/turn-informations/turn-informations.store';

@injectable()
export class TurnInformationsPresenter {
  private readonly toast = useCustomToast();
  private readonly gameModule: GameModule = useNuxtApp().$api.game;
  public readonly turnInformationsStore = useTurnInformationsStore();
  public readonly gameStore = useGameStore();
  public readonly eventsStore = useEventsStore();
  private readonly sseClient = useNuxtApp().$sseClient;
  private sseSubscription: Subscription | null = null;

  public async changeTurn(): Promise<void> {
    this.gameStore.setChangingTurn();
    try {
      await this.getGameTurnProcessStream();
      const updatedGame = await this.gameModule.changeTurn(this.gameStore.getSelectedGameId);
      this.gameStore.setSelectedGame(updatedGame);
      await this.getTurnInformations();
    }
    catch {
      this.toast.showError(`Error while changing turn`);
    }
    this.gameStore.unsetChangingTurn();
    await this.unsubscribeGameTurnProcessStream();
  }

  public async getTurnInformations(): Promise<void> {
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

  public async getGameTurnProcessStream(): Promise<void> {
    const channelName = `game-turn-process-${this.gameStore.getSelectedGameId}`;
    this.sseSubscription = this.sseClient.subscription(channelName);
    this.sseSubscription.create();

    this.sseSubscription.onMessage((data: GameTurnProcessStreamData) => {
      this.turnInformationsStore.setTurnProcessDatas(data);
    });
  }

  public async unsubscribeGameTurnProcessStream(): Promise<void> {
    if (!this.sseSubscription) {
      return;
    }
    await this.sseSubscription.delete();
  }
}
