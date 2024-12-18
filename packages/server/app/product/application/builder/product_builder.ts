import Product from '#product/domain/models/product';

export default class ProductBuilder {
  private name: string | null = null;
  private description: string | null = null;
  private licensedFileIdentifier: string | null = null;
  private price: number | null = null;
  private costOfProduction: number | null = null;
  private gameId: number | null = null;

  public withName(name: string): this {
    this.name = name;
    return this;
  }

  public withDescription(description: string): this {
    this.description = description;
    return this;
  }

  public withLicensedFileIdentifier(licensedFileIdentifier: string): this {
    this.licensedFileIdentifier = licensedFileIdentifier;
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

  public build(): Product {
    const product = new Product();

    if (this.name) product.name = this.name;
    else throw new Error('Name is required');
    if (this.description) product.description = this.description;
    else throw new Error('Description is required');
    if (this.licensedFileIdentifier) product.licensedFileIdentifier = this.licensedFileIdentifier;
    else throw new Error('Licensed file identifier is required');
    if (this.price) product.price = this.price;
    else throw new Error('Price is required');
    if (this.costOfProduction) product.costOfProduction = this.costOfProduction;
    else throw new Error('Cost of production is required');
    if (this.gameId) product.gameId = this.gameId;
    else throw new Error('Game ID is required');

    return product;
  }
}

export function aProduct(): ProductBuilder {
  return new ProductBuilder();
}
