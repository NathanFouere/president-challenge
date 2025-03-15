import type { SocialClassTypes } from '@president-challenge/shared/dist/social-class/social-class-types.js';

export default class GetSocialClassesByGameAndTypeQuery {
  constructor(
    public readonly gameId: number,
    public readonly socialClassType: SocialClassTypes,
  ) {
  }
}
