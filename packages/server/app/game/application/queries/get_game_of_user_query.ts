import type User from '#user/domain/models/user';

export class GetGameOfUserQuery {
  public readonly user: User;
  public readonly gameId: number;

  public constructor(user: User, gameId: number) {
    this.user = user;
    this.gameId = gameId;
  }
}
