import Product from '#product/domain/models/product';

export default class ProductBuilder {
  private price: number | null = null;
  private costOfProduction: number | null = null;
  private gameId: number | null = null;
  private sectorId: number | null = null;
  private definitionId: number | null = null;

  public withDefinitionId(definitionId: number): this {
    this.definitionId = definitionId;
    return this;
  }

  public withPrice(price: number): this {
    this.price = price;
    return this;
  }

  public withCostOfProduction(costOfProduction: number): this {
    this.costOfProduction = costOfProduction;
    return this;
  }

  public withGameId(gameId: number): this {
    this.gameId = gameId;
    return this;
  }

  public withSectorId(sectorId: number): this {
    this.sectorId = sectorId;
    return this;
  }

  public build(): Product {
    const product = new Product();

    if (this.price) product.price = this.price;
    else throw new Error('Price is required');
    if (this.costOfProduction) product.costOfProduction = this.costOfProduction;
    else throw new Error('Cost of production is required');
    if (this.gameId) product.gameId = this.gameId;
    else throw new Error('Game ID is required');
    if (this.sectorId) product.sectorId = this.sectorId;
    else throw new Error('Sector ID is required');
    if (this.definitionId) product.definitionId = this.definitionId;
    else throw new Error('Definition ID is required');

    return product;
  }
}

export function aProduct(): ProductBuilder {
  return new ProductBuilder();
}
