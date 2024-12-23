export class GetSectorByGameAndIdQuery {
  constructor(
    public readonly gameId: number,
    public readonly sectorId: number,
  ) {}
}
