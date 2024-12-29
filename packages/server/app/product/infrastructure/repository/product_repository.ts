import Product from '#product/domain/models/product';
import type IProductRepository from '#product/domain/repository/i_product_repository';

export default class ProductRepository implements IProductRepository {
  public async save(product: Product): Promise<void> {
    await product.save();
  }

  public async findById(id: number): Promise<Product | null> {
    return await Product.find(id);
  }

  public async findAll(): Promise<Product[]> {
    return await Product.all();
  }

  public async delete(product: Product): Promise<void> {
    await product.delete();
  }

  public async createMany(products: Product[]): Promise<void> {
    await Product.createMany(products);
  }
}
