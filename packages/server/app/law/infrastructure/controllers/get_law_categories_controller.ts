import * as console from 'node:console';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetLawCategoriesByGameQueryHandler
  from '#law/application/query/i_get_law_categories_by_game_query_handler';
import GetLawCategoriesByGameQuery from '#law/application/query/get_law_categories_by_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawCategoryDtoFactory from '#law/application/dto-factory/law_category_dto_factory';

@inject()
export default class GetLawCategoriesController {
  constructor(
    private readonly getLawCategoriesByGameQueryHandler: IGetLawCategoriesByGameQueryHandler,
    private readonly lawCategoryDtoFactory: LawCategoryDtoFactory,
  ) {
  }

  public async getLawCategories({ auth, params, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId: number = params.gameId;
      const lawCategories = await this.getLawCategoriesByGameQueryHandler.handle(new GetLawCategoriesByGameQuery(gameId));

      return this.lawCategoryDtoFactory.createFromLawCategories(lawCategories);
    }
    catch (e) {
      console.error(e);
      return response.internalServerError({
        message: 'Something went wrong',
        error: e,
      });
    }
  }
}
