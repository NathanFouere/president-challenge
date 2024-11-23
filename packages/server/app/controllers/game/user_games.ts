import type { HttpContext } from '@adonisjs/core/http';
import type User from '#models/auth/user';

export default class UserGamesController {
  async getUserGames({ auth, response }: HttpContext) {
    try {
      const user: User = auth.getUserOrFail();
      return user.related('games').query().orderBy('turn_number', 'desc');
    }
    catch (error) {
      console.error(error);
      return response.internalServerError({ message: 'Something went wrong', error });
    }
  }
}
