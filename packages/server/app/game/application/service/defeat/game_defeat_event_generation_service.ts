import { inject } from '@adonisjs/core';
import { GameDefeatSource } from '@president-challenge/shared/dist/game/game-defeat-source.js';
import type Game from '#game/domain/models/game';
import { GetEventDefinitionByIdentifierAndGameDefinitionQuery } from '#event/application/queries/get_event_definition_by_identifier_and_game_definition_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IEventRepository from '#event/domain/repository/i_event_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetEventDefinitionByIdentifierAndGameDefinitionQueryHandler
  from '#event/application/queries/i_get_event_definition_by_identifier_and_game_definition_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import EventFactory from '#event/application/factory/event_factory';
import { EventDefinitionsConstants } from '#event/application/queries/event_definitions_constants';

@inject()
export default class GameDefeatEventGenerationService {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly getEventDefinitionByIdentifierQueryHandler: IGetEventDefinitionByIdentifierAndGameDefinitionQueryHandler,
    private readonly eventFactory: EventFactory,
  ) {
  }

  public async createEventFromDefeat(game: Game): Promise<void> {
    if (!game.defeatSource) {
      throw new Error('Game defeat source is not set');
    }

    const eventDefinitionIdentifier = this.getEventDefinitionIdentifierFromDefeatSource(game.defeatSource);
    const eventDefinition = await this.getEventDefinitionByIdentifierQueryHandler.handle(
      new GetEventDefinitionByIdentifierAndGameDefinitionQuery(eventDefinitionIdentifier, game.definition.identifier),
    );

    const event = this.eventFactory.createEventForGameAtTurn(eventDefinition.id, game.id, game.turn);

    await this.eventRepository.save(event);
  }

  private getEventDefinitionIdentifierFromDefeatSource(defeatSource: GameDefeatSource): EventDefinitionsConstants {
    switch (defeatSource) {
      case GameDefeatSource.LOSE_PRESIDENTIAL_ELECTION:
        return EventDefinitionsConstants.DEFEAT_LOSE_PRESIDENTIAL_ELECTION;
      case GameDefeatSource.POPULAR_UPRISING:
        return EventDefinitionsConstants.DEFEAT_POPULAR_UPRISING;
      case GameDefeatSource.REVOLUTION:
        return EventDefinitionsConstants.DEFEAT_REVOLUTION;
      default:
        throw new Error('Unknown defeat source');
    }
  }
}
