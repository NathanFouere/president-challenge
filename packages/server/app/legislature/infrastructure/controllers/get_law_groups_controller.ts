import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import GetLawGroupsByGameQueryHandler from '#legislature/infrastructure/query/get_law_groups_by_game_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import LawGroupDtoFactory from '#legislature/application/dto-factories/law_group_dto_factory';
import GetLawGroupsByGameQuery from '#legislature/application/query/get_law_groups_by_game_query';

@inject()
export default class GetLawGroupsController {
  constructor(
    private readonly getLawGroupsByGameQueryHandler: GetLawGroupsByGameQueryHandler,
    private readonly lawGroupDtoFactory: LawGroupDtoFactory,
  ) {
  }

  public async getLawGroups({ auth, params, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId: number = params.gameId;
      const lawGroups = await this.getLawGroupsByGameQueryHandler.handle(new GetLawGroupsByGameQuery(gameId));

      return this.lawGroupDtoFactory.createFromLawGroups(lawGroups);
    }
    catch (e) {
      return response.internalServerError({
        message: 'Something went wrong',
        error: e,
      });
    }
  }
}
