import { injectable } from 'inversify';
import type SocialClassModule from '../../../server/repository/modules/social-class.module';
import { useCustomToast } from '../../composables/useCustomToast';
import { useGameStore } from '../../store/game/game.store';
import { useSocialClassStore } from '../../store/social-class/social-class.store';

@injectable()
export class SocialClassPresenter {
  public readonly socialClassModule: SocialClassModule = useNuxtApp().$api.socialClass;
  public readonly toast = useCustomToast();
  private readonly gameStore = useGameStore();
  public readonly socialClassStore = useSocialClassStore();

  public async getSocialClass(socialClassId: number): Promise<void> {
    this.socialClassStore.setIsGettingSocialClass();
    try {
      const socialClass = await this.socialClassModule.getSocialClass(socialClassId, this.gameStore.getSelectedGameId);
      this.socialClassStore.setSocialClass(socialClass);
    }
    catch {
      this.socialClassStore.setErrorOnGetSocialClass();
      this.toast.showError('Error fetching social classes');
    }
    this.socialClassStore.unsetIsGettingSocialClass();
  }
}
