import ProductPricePerTurn from '#product/domain/models/product_price_per_turn';
import type IProductPricePerTurnRepository from '#product/domain/repository/i_product_price_per_turn_repository';

export default class ProductPricePerTurnRepository implements IProductPricePerTurnRepository {
  public async save(productPricePerTurn: ProductPricePerTurn): Promise<void> {
    await productPricePerTurn.save();
  }

  public async findById(id: number): Promise<ProductPricePerTurn | null> {
    return await ProductPricePerTurn.find(id);
  }

  public async findAll(): Promise<ProductPricePerTurn[]> {
    return await ProductPricePerTurn.all();
  }

  public async delete(productPricePerTurn: ProductPricePerTurn): Promise<void> {
    await productPricePerTurn.delete();
  }

  public async createMany(productPricePerTurns: ProductPricePerTurn[]): Promise<void> {
    await ProductPricePerTurn.createMany(productPricePerTurns);
  }
}
