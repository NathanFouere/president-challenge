import { injectable } from 'inversify';
import type StateModule from '../../../server/repository/modules/state.module';
import { useGameStore } from '../../store/game/game.store';
import { useStateStore } from '../../store/state/state.store';

@injectable()
export class StatePresenter {
  public readonly stateModule: StateModule = useNuxtApp().$api.state;
  public readonly toast = useCustomToast();
  private readonly gameStore = useGameStore();
  public readonly stateStore = useStateStore();

  public async getState(): Promise<void> {
    this.stateStore.setIsGettingState();
    try {
      const state = await this.stateModule.getState(this.gameStore.getSelectedGameId);
      this.stateStore.setState(state);
    }
    catch (error) {
      console.error(error);
      this.stateStore.setErrorOnGetState();
      this.toast.showError('Error fetching state');
    }
    this.stateStore.unsetIsGettingState();
  }
}
