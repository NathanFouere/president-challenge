import type User from '#user/domain/models/user';

export class SelectUserGamesQuery {
  constructor(public readonly user: User) {
  }
}
