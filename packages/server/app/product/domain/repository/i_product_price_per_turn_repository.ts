import type ProductPricePerTurn from '#product/domain/models/product_price_per_turn';

export default abstract class IProductPricePerTurnRepository {
  public abstract save(productPricePerTurn: ProductPricePerTurn): Promise<void>;
  public abstract findById(id: number): Promise<ProductPricePerTurn | null>;
  public abstract findAll(): Promise<ProductPricePerTurn[]>;
  public abstract delete(productPricePerTurn: ProductPricePerTurn): Promise<void>;
  public abstract createMany(productPricePerTurns: ProductPricePerTurn[]): Promise<void>;
}
