import type { HttpContext } from '@adonisjs/core/http';
import type User from '#models/auth/user';
import Game from '#models/game/game';

export default class DeleteGameController {
  async deleteGame({ auth, params, response }: HttpContext) {
    try {
      const user: User = auth.getUserOrFail();
      const gameId = params.id;
      const game = await Game.query().where('id', gameId).andWhere('user_id', user.id).firstOrFail();
      await game.delete();
    }
    catch (error) {
      console.error(error);
      return response.internalServerError({ message: 'Something went wrong', error });
    }
    return response.ok({ message: 'game deleted successfully' });
  }
}
