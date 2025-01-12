export default class GetLawByGameAndTypeQuery {
  constructor(
    public readonly lawId: number,
    public readonly gameId: number,
  ) {
  }
}
