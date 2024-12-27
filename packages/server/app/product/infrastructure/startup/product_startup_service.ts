import { inject } from '@adonisjs/core';

import type { SectorTypes } from '@shared/dist/sector/sector-types.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductRepository } from '#product/infrastructure/repository/product_repository';
import productStartupConfig from '#game-config/product/product-startup-config.json' assert { type: 'json' };
import type Product from '#product/domain/models/product';
import { aProduct } from '#product/application/builder/product_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetSectorByGameAndTypeQueryHandler } from '#sector/application/query/get_sector_by_game_and_type_query_handler';
import { GetSectorByGameAndTypeQuery } from '#sector/application/query/get_sector_by_game_and_type_query';

@inject()
export class ProductStartupService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly getSectorByGameAndTypeQueryHandler: GetSectorByGameAndTypeQueryHandler,
  ) {
  }

  public async initialize(gameId: number): Promise<void> {
    const products: Product[] = [];

    for (const productValues of productStartupConfig) {
      const sector = await this.getSectorByGameAndTypeQueryHandler.handle(new GetSectorByGameAndTypeQuery(
        gameId,
        productValues.sectorType as SectorTypes,
      ));

      const product: Product = aProduct()
        .withName(productValues.name)
        .withDescription(productValues.description)
        .withLicensedFileIdentifier(productValues.licensedFileIdentifier)
        .withPrice(productValues.price)
        .withCostOfProduction(productValues.costOfProduction)
        .withGameId(gameId)
        .withSectorId(sector.id)
        .build();

      products.push(product);
    }

    await this.productRepository.createMany(products);
  }
}
