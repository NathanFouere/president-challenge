import type Product from '#product/domain/models/product';

export default abstract class IProductRepository {
  public abstract save(product: Product): Promise<void>;
  public abstract findById(id: number): Promise<Product | null>;
  public abstract findAll(): Promise<Product[]>;
  public abstract delete(product: Product): Promise<void>;
  public abstract createMany(products: Product[]): Promise<void>;
}
