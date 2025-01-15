import { injectable } from 'inversify';
import type LegislatureModule from '~~/server/repository/modules/legislature.module';
import { useGameStore } from '~/store/game/game.store';
import { useLawStore } from '~/store/legislature/law.store';

@injectable()
export class LawPresenter {
  private readonly legislationModule: LegislatureModule = useNuxtApp().$api.legislature;
  private readonly gameStore = useGameStore();
  private readonly toast = useCustomToast();
  public readonly lawStore = useLawStore();

  public async getLaw(lawId: number): Promise<void> {
    this.lawStore.setIsGettingLaw();
    try {
      const law = await this.legislationModule.getLaw(this.gameStore.getSelectedGameId, lawId);
      this.lawStore.setLaw(law);
    }
    catch (error) {
      console.error(error);
      this.toast.showError('Failed to fetch law.');
    }
    this.lawStore.unsetIsGettingLaw();
  }

  public async voteLaw(lawId: number): Promise<void> {
    this.lawStore.setIsVotingLaw();
    try {
      await this.legislationModule.voteLaw(this.gameStore.getSelectedGameId, lawId);
      this.toast.showSuccess('Voted successfully.');
    }
    catch (error) {
      console.error(error);
      this.toast.showError('Failed to vote.');
    }
    this.lawStore.unsetIsVotingLaw();
  }
}
