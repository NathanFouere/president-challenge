import { injectable } from 'inversify';
import type LegislatureModule from '../../../server/repository/modules/legislature.module';
import { useCustomToast } from '~/composables/useCustomToast';
import { useParliamentStore } from '~/store/legislature/parliament.store';
import { useGameStore } from '~/store/game/game.store';

@injectable()
export class ParliamentPresenter {
  private readonly legislationModule: LegislatureModule = useNuxtApp().$api.legislature;
  private readonly toast = useCustomToast();
  public readonly parliamentStore = useParliamentStore();
  private readonly gameStore = useGameStore();

  public async getParliament(): Promise<void> {
    this.parliamentStore.setIsGettingParliament();
    try {
      const parliament = await this.legislationModule.getParliament(this.gameStore.getSelectedGameId);
      this.parliamentStore.setParliament(parliament);
    }
    catch (error) {
      console.error(error);
      this.toast.showError('Failed to fetch parliament.');
    }
    this.parliamentStore.unsetIsGettingParliament();
  }
}
