import type { ProductDto } from '@shared/product/product-dto';
import type { MinimalProductDto } from '@shared/product/minimal-product-dto';
import FetchFactory from '../factory';
import Routes from '~~/server/repository/routes.client';

class ProductModule extends FetchFactory {
  private readonly RESOURCE = Routes.Product;

  public async getProducts(gameId: number): Promise<MinimalProductDto[]> {
    return this.call<ProductDto[]>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetProducts(gameId)}`,
      },
    );
  };

  public async getProduct(productId: number, gameId: number): Promise<ProductDto> {
    return this.call<ProductDto>(
      {
        method: 'GET',
        url: `${this.RESOURCE.GetProduct(productId, gameId)}`,
      },
    );
  }
}

export default ProductModule;
