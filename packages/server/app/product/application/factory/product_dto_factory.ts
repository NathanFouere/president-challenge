import { inject } from '@adonisjs/core';
import type { ProductDto } from '@shared/dist/product/product-dto.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
import type Product from '#product/domain/models/product';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import ChartDataFactory from '#common/utils/chart_data_factory';

@inject()
export class ProductDtoFactory {
  constructor(
    private readonly licensedFileDtoFactory: LicensedFileDTOFactory,
    private readonly chartDataFactory: ChartDataFactory,
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
      pricePerMonthChartData: this.chartDataFactory.createFromAmountPerTurn(
        product.pricePerTurn,
        'Price per month',
        0,
        100,
      ),
    };
  }
}
