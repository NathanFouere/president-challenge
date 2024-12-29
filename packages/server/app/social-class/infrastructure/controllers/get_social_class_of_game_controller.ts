import * as console from 'node:console';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SocialClassDtoFactory } from '#social-class/application/dto-factories/social-class-dto-factory';
import { GetSocialClassOfGameQuery } from '#social-class/application/queries/get_social_class_of_game_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetSocialClassOfGameQueryHandler
  from '#social-class/application/queries/i_get_social_class_of_game_query_handler';

@inject()
export default class GetSocialClassOfGameController {
  constructor(
    private readonly getSocialClassOfGameQueryHandler: IGetSocialClassOfGameQueryHandler,
    private readonly socialClassDtoFactory: SocialClassDtoFactory,
  ) {
  }

  public async getSocialClassOfGame({ auth, request, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId = request.param('gameId');
      const socialClassId = request.param('socialClassId');
      const socialClass = await this.getSocialClassOfGameQueryHandler.handleForDisplay(new GetSocialClassOfGameQuery(
        gameId,
        socialClassId,
      ));
      return this.socialClassDtoFactory.createFromSocialClass(socialClass);
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
