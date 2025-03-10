import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IEventRepository from '#event/domain/repository/i_event_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetEventDefinitionByIdentifierQueryHandler
  from '#event/application/queries/i_get_event_definition_by_identifier_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import EventFactory from '#event/application/factory/event_factory';
import type Game from '#game/domain/models/game';
import { GetEventDefinitionByIdentifierQuery } from '#event/application/queries/get_event_definition_by_identifier_query';
import { EventDefinitionsConstants } from '#event/application/queries/event_definitions_constants';

@inject()
export default class GameEndEventGenerationService {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly getEventDefinitionByIdentifierQueryHandler: IGetEventDefinitionByIdentifierQueryHandler,
    private readonly eventFactory: EventFactory,
  ) {
  }

  public async createEventFromGameEnding(game: Game): Promise<void> {
    const eventDefinition = await this.getEventDefinitionByIdentifierQueryHandler.handle(
      new GetEventDefinitionByIdentifierQuery(EventDefinitionsConstants.END_GAME),
    );

    const event = this.eventFactory.createEventForGameAtTurn(eventDefinition.id, game.id, game.turn);

    await this.eventRepository.save(event);
  }
}
