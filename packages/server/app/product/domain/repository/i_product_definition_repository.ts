import type ProductDefinition from '#product/domain/models/product_definition';

export default abstract class IProductDefinitionRepository {
  public abstract save(product: ProductDefinition): Promise<void>;
  public abstract findById(id: number): Promise<ProductDefinition | null>;
  public abstract findAll(): Promise<ProductDefinition[]>;
  public abstract delete(product: ProductDefinition): Promise<void>;
  public abstract createMany(products: ProductDefinition[]): Promise<void>;
}
