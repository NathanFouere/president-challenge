import type User from '#user/domain/models/user';

export class GetUserGamesQuery {
  constructor(public readonly user: User) {
  }
}
