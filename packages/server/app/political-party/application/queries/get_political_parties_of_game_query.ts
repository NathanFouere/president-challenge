export default class GetPoliticalPartiesOfGameQuery {
  public readonly gameId: number;

  constructor(gameId: number) {
    this.gameId = gameId;
  }
}
