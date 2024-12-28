import { inject } from '@adonisjs/core';
import type Product from '#product/domain/models/product';

@inject()
export class ProductPriceRandomizerService {
  public async changeProductsPricesRandomly(products: Product[]): Promise<void> {
    const promises = products.map(product => this.changeProductPriceRandomly(product));
    await Promise.all(promises);
  }

  public async changeProductPriceRandomly(product: Product): Promise<void> {
    const newPrice = Math.floor(Math.random() * 100) + 1;
    product.price = newPrice;
  }
}
