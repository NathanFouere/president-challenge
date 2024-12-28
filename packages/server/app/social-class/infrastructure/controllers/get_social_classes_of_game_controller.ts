import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { GetSocialClassesOfGameQueryHandler } from '#social-class/application/queries/get_social_classes_of_game_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { MinimalSocialClassDtoFactory } from '#social-class/application/dto-factories/minimal-social-class-dto-factory';
import { GetSocialClassesOfGameQuery } from '#social-class/application/queries/get_social_classes_of_game_query';

@inject()
export default class GetSocialClassesOfGameController {
  constructor(
    private readonly getSocialClassesOfGameQueryHandler: GetSocialClassesOfGameQueryHandler,
    private readonly minimalSocialClassDtoFactory: MinimalSocialClassDtoFactory,
  ) {
  }

  public async getSocialClassesOfGame({ auth, request, response }: HttpContext) {
    try {
      auth.getUserOrFail();
      const gameId = request.param('gameId');
      const socialClasses = await this.getSocialClassesOfGameQueryHandler.handleForDisplay(new GetSocialClassesOfGameQuery(
        gameId,
      ));
      return this.minimalSocialClassDtoFactory.createFromSocialClasses(socialClasses);
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
