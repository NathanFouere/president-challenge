import { injectable } from 'inversify';
import { useGameStore } from '~/store/game/game.store';
import { useCustomToast } from '~/composables/useCustomToast';
import type LegislatureModule from '~~/server/repository/modules/legislature.module';
import { useLawCategoriesStore } from '~/store/legislature/law-categories.store';

@injectable()
export class LawCategoriesPresenter {
  private readonly legislationModule: LegislatureModule = useNuxtApp().$api.legislature;
  private readonly gameStore = useGameStore();
  private readonly toast = useCustomToast();
  public readonly lawCategoriesStore = useLawCategoriesStore();

  public async getLawCategories(): Promise<void> {
    this.lawCategoriesStore.setIsGettingLawCategories();
    try {
      const lawCategories = await this.legislationModule.getLawCategories(this.gameStore.getSelectedGameId);
      this.lawCategoriesStore.setLawCategories(lawCategories);
    }
    catch (error) {
      console.error(error);
      this.toast.showError('Failed to fetch law groups.');
    }
    this.lawCategoriesStore.unsetIsGettingLawCategories();
  }
}
