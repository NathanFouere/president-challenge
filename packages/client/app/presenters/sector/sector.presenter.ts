import { injectable } from 'inversify';
import type SectorModule from '../../../server/repository/modules/sector.module';
import { useCustomToast } from '../../composables/useCustomToast';
import { useGameStore } from '../../store/game/game.store';
import { useSectorStore } from '../../store/sector/sector.store';

@injectable()
export class SectorPresenter {
  private readonly sectorModule: SectorModule = useNuxtApp().$api.sector;
  private readonly toast = useCustomToast();
  private readonly gameStore = useGameStore();
  public readonly sectorStore = useSectorStore();

  public async getSector(sectorId: number): Promise<void> {
    this.sectorStore.setIsGettingSector();
    try {
      const sector = await this.sectorModule.getSector(this.gameStore.getSelectedGameId, sectorId);
      this.sectorStore.setSector(sector);
    }
    catch (error) {
      console.error(error);
      this.toast.showError('Failed to fetch sector.');
    }
    this.sectorStore.unsetIsGettingSector();
  }
}
