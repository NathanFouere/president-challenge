import * as console from 'node:console';
import type { HttpContext } from '@adonisjs/core/http';
import { inject } from '@adonisjs/core';
import type User from '#models/auth/user';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import CreateGameService from '#services/game/create_game_service';

@inject()
export default class CreateGameController {
  constructor(
    private createGameService: CreateGameService,
  ) {
  }

  async createGame({ auth, response }: HttpContext) {
    try {
      const user: User = auth.getUserOrFail();
      console.log(this.createGameService);
      await this.createGameService.createGame(user);
    }
    catch (error) {
      console.error(error);
      return response.internalServerError({ message: 'Something went wrong : ' + error.message, error });
    }
    return response.ok({ message: 'game created successfully' });
  }
}
