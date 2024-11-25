import type User from '#models/user/user';
import type Game from '#models/game/game';

export default class SelectGamesService {
  public async getUserGames(user: User): Promise<Game[]> {
    return user.related('games').query().orderBy('turn_number', 'desc');
  }
}
