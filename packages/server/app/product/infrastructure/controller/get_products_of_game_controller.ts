import * as console from 'node:console';
import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetProductsOfGameQueryHandler } from '#product/application/query/get_products_of_game_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProductDtoFactory } from '#product/application/factory/product_dto_factory';
import { GetProductsOfGameQuery } from '#product/application/query/get_products_of_game_query';

@inject()
export default class GetProductsOfGameController {
  constructor(
    private readonly getProductsOfGameQueryHandler: GetProductsOfGameQueryHandler,
    private readonly productDtoFactory: ProductDtoFactory,
  ) {
  }

  public async getProductsOfGame({ auth, request, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId = request.param('gameId');
      const products = await this.getProductsOfGameQueryHandler.handle(
        new GetProductsOfGameQuery(gameId),
      );

      const productsDtos = this.productDtoFactory.createFromProducts(products);
      return productsDtos;
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
