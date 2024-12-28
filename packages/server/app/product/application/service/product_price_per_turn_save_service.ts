import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductPricePerTurnRepository } from '#product/infrastructure/repository/product_price_per_turn_repository';
import { aProductPricePerTurn } from '#product/application/builder/product_price_per_turn_builder';
import type Product from '#product/domain/models/product';

@inject()
export class ProductPricePerTurnSaveService {
  constructor(
    private readonly productPricePerTurnRepository: ProductPricePerTurnRepository,
  ) {
  }

  public async saveProductsPricesPerTurn(products: Product[], turn: number): Promise<void> {
    const promises = products.map(product => this.saveProductPricePerTurn(product, turn));
    await Promise.all(promises);
  }

  public async saveProductPricePerTurn(product: Product, turn: number): Promise<void> {
    const productPricePerTurn = aProductPricePerTurn()
      .withProductId(product.id)
      .withAmount(product.price)
      .withTurn(turn)
      .build();

    await this.productPricePerTurnRepository.save(productPricePerTurn);
  }
}
