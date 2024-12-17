import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductRepository } from '#product/infrastructure/repository/product_repository';
import productStartupConfig from '#game-config/product/product-startup-config.json' assert { type: 'json' };
import type Product from '#product/domain/models/product';
import { aProduct } from '#product/application/builder/product_builder';

@inject()
export class ProductStartupService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    const products: Product[] = [];

    for (const productValues of productStartupConfig) {
      const product: Product = aProduct()
        .withName(productValues.name)
        .withDescription(productValues.description)
        .withLicensedFileIdentifier(productValues.licensedFileIdentifier)
        .withPrice(productValues.price)
        .withCostOfProduction(productValues.costOfProduction)
        .withGameId(gameId)
        .build();

      products.push(product);
    }

    await this.productRepository.createMany(products);
  }
}
