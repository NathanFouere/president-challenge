import type User from '#models/user/user';

export class SelectUserGamesQuery {
  public readonly user: User;

  constructor(user: User) {
    this.user = user;
  }
}
