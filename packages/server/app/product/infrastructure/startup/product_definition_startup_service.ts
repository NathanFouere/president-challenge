import { inject } from '@adonisjs/core';

import productStartupConfig from '#game-config/product/product-startup-config.json' assert { type: 'json' };
import { aProductDefinition } from '#product/application/builder/product_definition_builder';
import type { StartupProcessorStep } from '#common/startup/startup_processor_step';
import type ProductDefinition from '#product/domain/models/product_definition';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IProductDefinitionRepository from '#product/domain/repository/i_product_definition_repository';

@inject()
export class ProductDefinitionStartupService implements StartupProcessorStep {
  constructor(
    private readonly productRepository: IProductDefinitionRepository,
  ) {
  }

  public async execute(): Promise<void> {
    const products: ProductDefinition[] = [];

    for (const productValues of productStartupConfig) {
      const product: ProductDefinition = aProductDefinition()
        .withName(productValues.name)
        .withDescription(productValues.description)
        .withLicensedFileIdentifier(productValues.licensedFileIdentifier)
        .withDefaultPrice(productValues.price)
        .withDefaultCostOfProduction(productValues.costOfProduction)
        .withSectorDefinitionId(productValues.sectorId)
        .build();

      products.push(product);
    }

    await this.productRepository.createMany(products);
  }
}
