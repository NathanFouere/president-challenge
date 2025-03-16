import { inject } from '@adonisjs/core';
import type { MinimalProductDto } from '@president-challenge/shared/dist/product/minimal-product-dto.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
import type Product from '#product/domain/models/product';

@inject()
export class MinimalProductDtoFactory {
  constructor(
    private readonly licensedFileDtoFactory: LicensedFileDTOFactory,
  ) {
  }

  public async createFromProducts(products: Product[]): Promise<MinimalProductDto[]> {
    return Promise.all(products.map(product => this.createFromProduct(product)));
  }

  public async createFromProduct(product: Product): Promise<MinimalProductDto> {
    return {
      id: product.id,
      name: product.definition.name,
      description: product.definition.description,
      licensedFile: await this.licensedFileDtoFactory.createFromLicensedFile(product.definition.licensedFile),
      price: product.price,
      costOfProduction: product.costOfProduction,
    };
  }
}
