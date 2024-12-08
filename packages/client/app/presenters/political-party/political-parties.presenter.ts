import { injectable } from 'inversify';
import type PoliticalPartyModule from '../../../server/repository/modules/political-party.module';
import { usePoliticalPartiesStore } from '../../store/political-party/political-parties.store';
import { useGameStore } from '../../store/game/game.store';
import { useCustomToast } from '../../composables/useCustomToast';
import { useGlobalLoader } from '../../composables/useGlobalLoader';

@injectable()
export class PoliticalPartiesPresenter {
  public readonly politicalPartyModule: PoliticalPartyModule = useNuxtApp().$api.politicalParty;
  public readonly politicalPartiesStore = usePoliticalPartiesStore();
  public readonly gameStore = useGameStore();
  private readonly globalLoader = useGlobalLoader();
  public readonly toast = useCustomToast();

  public async getPoliticalParties(): Promise<void> {
    try {
      this.globalLoader.startLoading();
      this.politicalPartiesStore.setIsGettingPoliticalParties();
      const politicalParties = await this.politicalPartyModule.getPoliticalParties(this.gameStore.getSelectedGameId);
      this.politicalPartiesStore.setPoliticalParties(politicalParties);
    }
    catch (error) {
      this.politicalPartiesStore.setErrorOnGetPoliticalParties();
      this.toast.showError('Failed to fetch political parties.');
    }
    finally {
      this.globalLoader.stopLoading();
      this.politicalPartiesStore.unsetIsGettingPoliticalParties();
      this.politicalPartiesStore.unsetErrorOnGetPoliticalParties();
    }
  }
}
