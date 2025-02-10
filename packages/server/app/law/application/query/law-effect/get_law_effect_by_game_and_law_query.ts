export default class GetLawEffectByGameAndLawQuery {
  constructor(
    public readonly gameId: number,
    public readonly lawId: number,
  ) {
  }
}
