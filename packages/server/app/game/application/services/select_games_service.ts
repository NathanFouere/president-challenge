import type User from '#user/domain/models/user';
import type Game from '#game/domain/models/game';

export default class SelectGamesService {
  public async getUserGames(user: User): Promise<Game[]> {
    return user.related('games').query().orderBy('turn_number', 'desc');
  }
}
