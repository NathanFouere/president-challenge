export abstract class SaveAmountForTurnBuilder {
  protected amount: number | null = null;
  protected turn: number | null = null;

  public withAmount(amount: number): this {
    this.amount = amount;
    return this;
  }

  public withTurn(turn: number): this {
    this.turn = turn;
    return this;
  }
}
