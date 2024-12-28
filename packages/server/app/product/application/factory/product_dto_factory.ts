import { inject } from '@adonisjs/core';
import type { ProductDto } from '@shared/dist/product/product-dto.js';
import type { ChartDataDTO } from '@shared/dist/chart/ChartDataDTO.js';

import { getDateFromTurnNumber } from '@shared/dist/utils/date-converter.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { LicensedFileDTOFactory } from '#licensed-file/application/factory/licensed_file_dto_factory';
import type Product from '#product/domain/models/product';

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
      pricePerMonthChartData: this.createPricePerMonthChartData(product),
    };
  }

  private createPricePerMonthChartData(product: Product): ChartDataDTO {
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];
    const data: number[] = [];

    for (const monthPrice of product.pricePerTurn) {
      data.push(monthPrice.amount);
      backgroundColor.push(monthPrice.color);
      borderColor.push(monthPrice.color);
      labels.push(getDateFromTurnNumber(monthPrice.turn));
    }

    return {
      title: 'Price per month',
      labels,
      datasets: [
        {
          label: 'Price per month',
          data,
          backgroundColor,
          borderColor,
        },
      ],
    };
  }
}
