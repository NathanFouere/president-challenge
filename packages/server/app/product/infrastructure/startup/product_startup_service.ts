import { inject } from '@adonisjs/core';

import type Product from '#product/domain/models/product';
import { aProduct } from '#product/application/builder/product_builder';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IProductRepository from '#product/domain/repository/i_product_repository';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
import Sector from '#sector/domain/model/sector';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetProductDefinitionsByGameDefinitionQueryHandler
  from '#product/application/query/i_get_product_definitions_by_game_definition_query_handler';
import GetProductDefinitionsByGameDefinitionQuery
  from '#product/application/query/get_product_definitions_by_game_definition_query';

@inject()
export class ProductStartupService implements StartupProcessorStep {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly getProductDefinitionsByGameDefinitionQueryHandler: IGetProductDefinitionsByGameDefinitionQueryHandler,
  ) {
  }

  public async execute(gameId: number, gameDefinitionIdentifier: string): Promise<void> {
    const productDefinitions = await this.getProductDefinitionsByGameDefinitionQueryHandler.handle(
      new GetProductDefinitionsByGameDefinitionQuery(gameDefinitionIdentifier),
    );
    const products: Product[] = [];

    for (const productDefinition of productDefinitions) {
      const sectorFromDefinitionIdAndGameId = await Sector
        .query()
        .where('definition_id', productDefinition.sectorDefinitionId)
        .where('game_id', gameId)
        .firstOrFail();
      const product: Product = aProduct()
        .withPrice(productDefinition.defaultPrice)
        .withCostOfProduction(productDefinition.defaultCostOfProduction)
        .withGameId(gameId)
        .withSectorId(sectorFromDefinitionIdAndGameId.id)
        .withDefinitionId(productDefinition.id)
        .build();

      products.push(product);
    }

    await this.productRepository.createMany(products);
  }
}
