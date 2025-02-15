import ProductDefinition from '#product/domain/models/product_definition';

export default class ProductDefinitionBuilder {
  private name: string | null = null;
  private description: string | null = null;
  private licensedFileIdentifier: string | null = null;
  private defaultPrice: number | null = null;
  private defaultCostOfProduction: number | null = null;
  private sectorDefinitionId: number | null = null;

  public withName(name: string): this {
    this.name = name;
    return this;
  }

  public withSectorDefinitionId(sectorDefinitionId: number): this {
    this.sectorDefinitionId = sectorDefinitionId;
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

  public withDefaultPrice(price: number): this {
    this.defaultPrice = price;
    return this;
  }

  public withDefaultCostOfProduction(costOfProduction: number): this {
    this.defaultCostOfProduction = costOfProduction;
    return this;
  }

  public build(): ProductDefinition {
    const product = new ProductDefinition();

    if (this.name) product.name = this.name;
    else throw new Error('Name is required');
    if (this.description) product.description = this.description;
    else throw new Error('Description is required');
    if (this.licensedFileIdentifier) product.licensedFileIdentifier = this.licensedFileIdentifier;
    else throw new Error('Licensed file identifier is required');
    if (this.defaultPrice) product.defaultPrice = this.defaultPrice;
    else throw new Error('Price is required');
    if (this.defaultCostOfProduction) product.defaultCostOfProduction = this.defaultCostOfProduction;
    else throw new Error('Cost of production is required');
    if (this.sectorDefinitionId) product.sectorDefinitionId = this.sectorDefinitionId;
    else throw new Error('Sector definition id required');

    return product;
  }
}

export function aProductDefinition(): ProductDefinitionBuilder {
  return new ProductDefinitionBuilder();
}
