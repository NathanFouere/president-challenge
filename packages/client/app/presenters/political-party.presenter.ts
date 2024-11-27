import { injectable } from 'inversify';
import type PoliticalPartyModule from '../../server/repository/modules/political-party.module';
import { usePoliticalPartyStore } from '../store/political-party/political-party.store';
import { useGameStore } from '../store/game/game.store';
import { useCustomToast } from '../composables/useCustomToast';

@injectable()
export class PoliticalPartyPresenter {
  public readonly politicalPartyModule: PoliticalPartyModule = useNuxtApp().$api.politicalParty;
  public readonly politicalPartyStore = usePoliticalPartyStore();
  public readonly gameStore = useGameStore();
  public readonly toast = useCustomToast();

  public async getPoliticalParties(): Promise<void> {
    try {
      const politicalParties = await this.politicalPartyModule.getPoliticalParties(this.gameStore.getSelectedGameId);
      this.politicalPartyStore.setPoliticalParties(politicalParties);
    }
    catch (error) {
      this.toast.showError('Failed to fetch political parties.');
      throw error;
    }
  }
}
