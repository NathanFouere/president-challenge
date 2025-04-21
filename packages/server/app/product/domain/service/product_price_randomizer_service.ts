import { inject } from '@adonisjs/core';
import type Product from '#product/domain/models/product';

@inject()
export class ProductPriceRandomizerService {
  public changeProductsPricesRandomly(products: Product[]): void {
    products.forEach(product => this.changeProductPriceRandomly(product));
  }

  public changeProductPriceRandomly(product: Product): void {
    const minPrice = Math.max(product.costOfProduction - 25, 1);
    const maxPrice = product.costOfProduction + 25;

    product.price = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
  }
}
