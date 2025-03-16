import { inject } from '@adonisjs/core';
import type { ProductDto } from '@president-challenge/shared/dist/product/product-dto.js';
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

  public async createFromProduct(product: Product): Promise<ProductDto> {
    return {
      id: product.id,
      name: product.definition.name,
      description: product.definition.description,
      licensedFile: await this.licensedFileDtoFactory.createFromLicensedFile(product.definition.licensedFile),
      price: product.price,
      costOfProduction: product.costOfProduction,
      pricePerMonthChartData: this.chartDataFactory.createLineCartFromSaveAmountPerTurn(
        product.pricePerTurn,
        'Price per month',
        0,
        100,
      ),
    };
  }
}
