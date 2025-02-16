import { injectable } from 'inversify';
import type PoliticalPartyModule from '../../../server/repository/modules/political-party.module';
import { useGameStore } from '~/store/game/game.store';
import { useCustomToast } from '~/composables/useCustomToast';
import { usePoliticalPartyStore } from '~/store/political-party/political-party.store';

@injectable()
export class PoliticalPartyPresenter {
  private readonly politicalPartyModule: PoliticalPartyModule = useNuxtApp().$api.politicalParty;
  private readonly gameStore = useGameStore();
  private readonly toast = useCustomToast();
  public readonly politicalPartyStore = usePoliticalPartyStore();

  public async getPoliticalParty(politicalPartyId: number): Promise<void> {
    try {
      this.politicalPartyStore.setIsGettingPoliticalParty();
      const politicalParty = await this.politicalPartyModule.getPoliticalParty(politicalPartyId, this.gameStore.getSelectedGameId);
      this.politicalPartyStore.setPoliticalParty(politicalParty);

      this.politicalPartyStore.unsetErrorOnGetPoliticalParty();
      this.politicalPartyStore.unsetIsGettingPoliticalParty();
    }
    catch {
      this.politicalPartyStore.setErrorOnGetPoliticalParty();
      this.toast.showError('Failed to fetch political party.');
    }
  }
}
