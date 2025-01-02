import { inject } from '@adonisjs/core';
import type { ProductDto } from '@shared/dist/product/product-dto.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
import type Product from '#product/domain/models/product';
import { createChartDataFromAmountPerTurn } from '#common/utils';

@inject()
export class ProductDtoFactory {
  constructor(
    private readonly licensedFileDtoFactory: LicensedFileDTOFactory,
  ) {
  }

  public createFromProducts(products: Product[]): ProductDto[] {
    return products.map(product => this.createFromProduct(product));
  }

  public createFromProduct(product: Product): ProductDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      licensedFile: this.licensedFileDtoFactory.createFromLicensedFile(product.licensedFile),
      price: product.price,
      costOfProduction: product.costOfProduction,
      pricePerMonthChartData: createChartDataFromAmountPerTurn(product.pricePerTurn, 'Price per month'),
    };
  }
}
