export class GetDisplayableEventsOfTurnQuery {
  constructor(
    public readonly gameId: number,
    public readonly turn: number,
  ) {
  }
}
