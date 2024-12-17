import { inject } from '@adonisjs/core';
import type { ProductDto } from '@shared/types/product/product-dto.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
import type Product from '#product/domain/models/product';

@inject()
export class ProductDtoFactory {
  constructor(
    private readonly licensedFileDtoFactory: LicensedFileDTOFactory,
  ) {
  }

  public createFromProduct(product: Product): ProductDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      licensedFile: this.licensedFileDtoFactory.createFromLicensedFile(product.licensedFile),
      price: product.price,
      costOfProduction: product.costOfProduction,
    };
  }

  public createFromProducts(products: Product[]): ProductDto[] {
    return products.map(product => this.createFromProduct(product));
  }
}
