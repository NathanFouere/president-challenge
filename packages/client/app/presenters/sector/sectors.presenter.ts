import { injectable } from 'inversify';
import type SectorModule from '../../../server/repository/modules/sector.module';
import { useCustomToast } from '../../composables/useCustomToast';
import { useGameStore } from '../../store/game/game.store';
import { useSectorsStore } from '../../store/sector/sectors.store';

@injectable()
export class SectorsPresenter {
  private readonly sectorModule: SectorModule = useNuxtApp().$api.sector;
  private readonly toast = useCustomToast();
  private readonly gameStore = useGameStore();
  public readonly sectorsStore = useSectorsStore();

  public async getSectors(): Promise<void> {
    this.sectorsStore.setIsGettingSectors();
    try {
      const sectors = await this.sectorModule.getSectors(this.gameStore.getSelectedGameId);
      this.sectorsStore.setSectors(sectors);
    }
    catch (error) {
      console.error(error);
      this.toast.showError('Failed to fetch sectors.');
    }
    this.sectorsStore.unsetIsGettingSectors();
  }
}
