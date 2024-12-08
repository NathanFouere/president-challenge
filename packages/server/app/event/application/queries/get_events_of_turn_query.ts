export class GetEventsOfTurnQuery {
  constructor(
    public readonly gameId: number,
    public readonly turn: number,
  ) {
  }
}
