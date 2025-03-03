import { aGame } from '#game/application/builders/game_builder';
import type Game from '#game/domain/models/game';

export default class GameFactory {
  public createForUser(userId: number): Game {
    return aGame()
      .withUserId(userId)
      .withTurn(0)
      .withPoliticalWeight(25)
      .withMaxTurns(36)
      .build();
  }
}
