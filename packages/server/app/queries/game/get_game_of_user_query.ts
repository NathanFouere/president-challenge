import type User from '#models/user/user';

export class GetGameOfPlayerQuery {
  public readonly user: User;
  public readonly gameId: number;

  public constructor(user: User, gameId: number) {
    this.user = user;
    this.gameId = gameId;
  }
}
