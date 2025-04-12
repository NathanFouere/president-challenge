import { aGame } from '#game/application/builders/game_builder';
import type Game from '#game/domain/models/game';
import type GameDefinition from '#game/domain/models/game_definition';

export default class GameFactory {
  public createForUser(userId: number, gameDefinition: GameDefinition): Game {
    return aGame()
      .withUserId(userId)
      .withTurn(0)
      .withPoliticalWeight(25)
      .withDefinitionIdentifier(gameDefinition.identifier)
      .build();
  }
}
