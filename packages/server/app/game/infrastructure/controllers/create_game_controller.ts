import * as console from 'node:console';
import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';
import type User from '#user/domain/models/user';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import CreateGameService from '#game/application/service/create_game_service';

@inject()
export default class CreateGameController {
  constructor(
    private readonly createGameService: CreateGameService,
  ) {
  }

  public async createGame({ auth, params, response }: HttpContext) {
    try {
      const user: User = await auth.getUserOrFail();
      // TODO => should be loaded here, should be done in a repository
      await user.load('games');
      const gameDefinitionIdentifier: string = params.identifier;
      await this.createGameService.createGame(user, gameDefinitionIdentifier);
    }
    catch (error) {
      console.error(error);
      return response.internalServerError({ message: 'Something went wrong : ' + error.message, error });
    }
    return response.ok({ message: 'game created successfully' });
  }
}
