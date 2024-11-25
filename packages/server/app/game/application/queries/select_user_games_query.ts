import type User from '#user/domain/models/user';

export class SelectUserGamesQuery {
  public readonly user: User;

  constructor(user: User) {
    this.user = user;
  }
}
