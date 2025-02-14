import type IProductDefinitionRepository from '#product/domain/repository/i_product_definition_repository';
import ProductDefinition from '#product/domain/models/product_definition';

export default class ProductDefinitionRepository implements IProductDefinitionRepository {
  public async save(product: ProductDefinition): Promise<void> {
    await product.save();
  }

  public async saveMany(products: ProductDefinition[]): Promise<void> {
    const promises = products.map(product => this.save(product));
    await Promise.all(promises);
  }

  public async findById(id: number): Promise<ProductDefinition | null> {
    return await ProductDefinition.find(id);
  }

  public async findAll(): Promise<ProductDefinition[]> {
    return await ProductDefinition.all();
  }

  public async delete(product: ProductDefinition): Promise<void> {
    await product.delete();
  }

  public async createMany(products: ProductDefinition[]): Promise<void> {
    await ProductDefinition.createMany(products);
  }
}
