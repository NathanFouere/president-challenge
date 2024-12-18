export class GetProductOfGameQuery {
  constructor(
    public readonly gameId: number,
    public readonly productId: number,
  ) {
  }
}
