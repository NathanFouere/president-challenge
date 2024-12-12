export class GetEventByIdentifierAndGameQuery {
  constructor(
    public readonly eventIdentifier: string,
    public readonly gameId: number,
  ) {
  }
}
