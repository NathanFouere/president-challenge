import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductDtoFactory } from '#product/application/factory/product_dto_factory.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetProductOfGameQueryHandler } from '#product/application/query/get_product_of_game_query_handler';
import { GetProductOfGameQuery } from '#product/application/query/get_product_of_game_query';

@inject()
export default class GetProductOfGameController {
  constructor(
    private readonly getProductOfGameQueryHandler: GetProductOfGameQueryHandler,
    private readonly productDtoFactory: ProductDtoFactory,
  ) {
  }

  public async getProductOfGame({ auth, request, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId = request.param('gameId');
      const productId = request.param('productId');
      const product = await this.getProductOfGameQueryHandler.handle(
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
