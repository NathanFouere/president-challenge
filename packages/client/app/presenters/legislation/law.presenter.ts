import { injectable } from 'inversify';
import type LegislatureModule from '~~/server/repository/modules/legislature.module';
import { useGameStore } from '~/store/game/game.store';
import { useLawStore } from '~/store/legislature/law.store';
import container from '~~/config/container';
import type { LawCategoriesPresenter } from '~/presenters/legislation/law-categories.presenter';
import { COMMON_DEPENDANCY_TYPES } from '~~/config/common.types';
import type GameModule from '~~/server/repository/modules/game.module';

@injectable()
export class LawPresenter {
  private readonly legislationModule: LegislatureModule = useNuxtApp().$api.legislature;
  private readonly lawCategoriesPresenter = container.get<LawCategoriesPresenter>(COMMON_DEPENDANCY_TYPES.LawCategoriesPresenter);
  private readonly gameStore = useGameStore();
  private readonly toast = useCustomToast();
  public readonly lawStore = useLawStore();
  private readonly gameModule: GameModule = useNuxtApp().$api.game;

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
      const updatedGameDto = await this.gameModule.getGame(this.gameStore.getSelectedGameId);
      this.gameStore.updateSelectedGame(updatedGameDto);
    }
    catch (error) {
      console.error(error);
      this.toast.showError('Failed to vote.');
    }
    await this.getLaw(lawId);
    await this.lawCategoriesPresenter.getLawCategories();
    this.lawStore.unsetIsVotingLaw();
  }
}
