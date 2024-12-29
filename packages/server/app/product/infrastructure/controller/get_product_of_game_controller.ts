import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';

import { GetProductOfGameQuery } from '#product/application/query/get_product_of_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductDtoFactory } from '#product/application/factory/product_dto_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetProductOfGameQueryHandler from '#product/application/query/i_get_product_of_game_query_handler';

@inject()
export default class GetProductOfGameController {
  constructor(
    private readonly getProductOfGameQueryHandler: IGetProductOfGameQueryHandler,
    private readonly productDtoFactory: ProductDtoFactory,
  ) {
  }

  public async getProductOfGame({ auth, request, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId = request.param('gameId');
      const productId = request.param('productId');
      const product = await this.getProductOfGameQueryHandler.handleForDisplay(
        new GetProductOfGameQuery(gameId, productId),
      );

      const productDto = this.productDtoFactory.createFromProduct(product);
      return productDto;
    }
    catch (error) {
      console.error(error);
      return response.internalServerError({
        message: 'Something went wrong',
        error,
      });
    }
  }
}
