import { inject } from '@adonisjs/core';
import type Product from '#product/domain/models/product';

@inject()
export class ProductPriceRandomizerService {
  public async changeProductsPricesRandomly(products: Product[]): Promise<void> {
    const promises = products.map(product => this.changeProductPriceRandomly(product));
    await Promise.all(promises);
  }

  public async changeProductPriceRandomly(product: Product): Promise<void> {
    const costOfProduction = product.costOfProduction;
    const maxInterval = 25;
    const minPrice = Math.max(costOfProduction - maxInterval, 1);
    const maxPrice = costOfProduction + maxInterval;

    const newPrice = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
    product.price = newPrice;
  }
}
