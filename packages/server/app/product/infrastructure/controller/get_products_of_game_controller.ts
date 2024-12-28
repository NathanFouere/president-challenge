import * as console from 'node:console';
import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetProductsOfGameQueryHandler } from '#product/application/query/get_products_of_game_query_handler';
import { GetProductsOfGameQuery } from '#product/application/query/get_products_of_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalProductDtoFactory } from '#product/application/factory/minimal_product_dto_factory';

@inject()
export default class GetProductsOfGameController {
  constructor(
    private readonly getProductsOfGameQueryHandler: GetProductsOfGameQueryHandler,
    private readonly minimalProductDtoFactory: MinimalProductDtoFactory,
  ) {
  }

  public async getProductsOfGame({ auth, request, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId = request.param('gameId');
      const products = await this.getProductsOfGameQueryHandler.handleForDisplay(
        new GetProductsOfGameQuery(gameId),
      );
      const productsDtos = this.minimalProductDtoFactory.createFromProducts(products);
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
