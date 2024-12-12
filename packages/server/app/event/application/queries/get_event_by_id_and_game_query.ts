export class GetEventByIdAndGameQuery {
  constructor(
    public readonly eventId: number,
    public readonly gameId: number,
  ) {
  }
}
