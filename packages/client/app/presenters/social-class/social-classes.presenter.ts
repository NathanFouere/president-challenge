import { injectable } from 'inversify';
import type SocialClassModule from '../../../server/repository/modules/social-class.module';
import { useCustomToast } from '../../composables/useCustomToast';
import { useGameStore } from '../../store/game/game.store';
import { useSocialClassesStore } from '../../store/social-class/social-classes.store';

@injectable()
export class SocialClassesPresenter {
  public readonly socialClassModule: SocialClassModule = useNuxtApp().$api.socialClass;
  public readonly toast = useCustomToast();
  private readonly gameStore = useGameStore();
  public readonly socialClassesStore = useSocialClassesStore();

  public async getSocialClasses(): Promise<void> {
    this.socialClassesStore.setIsGettingSocialClasses();
    try {
      const socialClasses = await this.socialClassModule.getSocialClasses(this.gameStore.getSelectedGameId);
      this.socialClassesStore.setSocialClasses(socialClasses);
    }
    catch {
      this.socialClassesStore.setErrorOnGetSocialClasses();
      this.toast.showError('Error fetching social classes');
    }
    this.socialClassesStore.unsetIsGettingSocialClasses();
  }
}
