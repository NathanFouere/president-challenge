import Product from '#product/domain/models/product';

export class ProductRepository {
  public async save(product: Product): Promise<void> {
    await product.save();
  }

  public async findById(id: number): Promise<Product | null> {
    return Product.find(id);
  }

  public async findAll(): Promise<Product[]> {
    return Product.all();
  }

  public async delete(product: Product): Promise<void> {
    await product.delete();
  }

  public async createMany(products: Product[]): Promise<void> {
    await Product.createMany(products);
  }
}
