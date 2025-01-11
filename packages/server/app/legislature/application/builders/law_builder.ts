export class LawBuilder {
  protected gameId: number | null = null;
  protected voted: boolean | null = null;
  protected order: number | null = null;
  protected lawGroupId: number | null = null;
  protected name: string | null = null;
  protected description: string | null = null;

  public withName(name: string): this {
    this.name = name;
    return this;
  }

  public withDescription(description: string): this {
    this.description = description;
    return this;
  }

  public withLawGroupId(lawGroupId: number): this {
    this.lawGroupId = lawGroupId;
    return this;
  }

  public forGame(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public withVoted(voted: boolean): this {
    this.voted = voted;
    return this;
  }

  public withOrder(order: number): this {
    this.order = order;
    return this;
  }
}
