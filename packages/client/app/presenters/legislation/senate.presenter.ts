import { injectable } from 'inversify';
import type LegislatureModule from '../../../server/repository/modules/legislature.module';
import { useSenateStore } from '../../store/legislature/senate.store';
import { useCustomToast } from '../../composables/useCustomToast';
import { useGameStore } from '../../store/game/game.store';

@injectable()
export class SenatePresenter {
  public readonly legislationModule: LegislatureModule = useNuxtApp().$api.legislature;
  public readonly senateStore = useSenateStore();
  public readonly toast = useCustomToast();
  private readonly gameStore = useGameStore();

  public async getSenate(): Promise<void> {
    this.senateStore.setIsGettingSenate();
    try {
      const senate = await this.legislationModule.getSenate(this.gameStore.getSelectedGameId);
      this.senateStore.setSenate(senate);
    }
    catch (error) {
      console.error(error);
      this.toast.showError('Failed to fetch senate.');
    }
    this.senateStore.unsetIsGettingSenate();
  }
}
