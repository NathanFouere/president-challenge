import type { SocialClassTypes } from '@shared/dist/social-class/social-class-types.js';

export default class GetSocialClassByGameAndTypeQuery {
  constructor(
    public readonly gameId: number,
    public readonly socialClassType: SocialClassTypes,
  ) {
  }
}
