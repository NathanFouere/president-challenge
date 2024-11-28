import { injectable } from 'inversify';
import { useGameStore } from '../../store/game/game.store';
import { useCustomToast } from '../../composables/useCustomToast';
import type PoliticalPartyModule from '../../../server/repository/modules/political-party.module';
import { usePoliticalPartyStore } from '../../store/political-party/political-party.store';

@injectable()
export class PoliticalPartyPresenter {
  public readonly politicalPartyModule: PoliticalPartyModule = useNuxtApp().$api.politicalParty;
  public readonly gameStore = useGameStore();
  public readonly toast = useCustomToast();
  public readonly politicalPartyStore = usePoliticalPartyStore();

  public async getPoliticalParty(politicalPartyId: number): Promise<void> {
    try {
      this.politicalPartyStore.setIsGettingPoliticalParty();
      const politicalParty = await this.politicalPartyModule.getPoliticalParty(politicalPartyId, this.gameStore.getSelectedGameId);
      this.politicalPartyStore.setPoliticalParty(politicalParty);

      this.politicalPartyStore.unsetIsGettingPoliticalParty();
      this.politicalPartyStore.unsetErrorOnGetPoliticalParty();
      this.toast.showSuccess('Political party fetched successfully.');
    }
    catch (error) {
      this.politicalPartyStore.setErrorOnGetPoliticalParty();
      this.toast.showError('Failed to fetch political party.');
    }
  }
}
