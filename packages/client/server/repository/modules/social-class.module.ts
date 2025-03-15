import type { MinimalSocialClassDto } from '@president-challenge/shared/dist/social-class/minimal-social-class-dto';
import type { SocialClassDto } from '@president-challenge/shared/dist/social-class/social-class-dto';
import FetchFactory from '../factory';
import Routes from '../routes.client';

class SocialClassModule extends FetchFactory {
  private readonly RESOURCE = Routes.SocialClass;

  public async getSocialClasses(gameId: number): Promise<MinimalSocialClassDto[]> {
    return this.call<MinimalSocialClassDto[]>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetSocialClasses(gameId)}`,
      },
    );
  };

  public async getSocialClass(socialClassId: number, gameId: number): Promise<SocialClassDto> {
    return this.call<SocialClassDto>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetSocialClass(socialClassId, gameId)}`,
      },
    );
  };
}

export default SocialClassModule;
