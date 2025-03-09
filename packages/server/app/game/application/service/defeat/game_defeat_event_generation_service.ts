import { inject } from '@adonisjs/core';
import type Game from '#game/domain/models/game';
import { GetEventDefinitionByIdentifierQuery } from '#event/application/queries/get_event_definition_by_identifier_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IEventRepository from '#event/domain/repository/i_event_repository';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetEventDefinitionByIdentifierQueryHandler
  from '#event/application/queries/i_get_event_definition_by_identifier_query_handler';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import EventFactory from '#event/application/factory/event_factory';

@inject()
export default class GameDefeatEventGenerationService {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly getEventDefinitionByIdentifierQueryHandler: IGetEventDefinitionByIdentifierQueryHandler,
    private readonly eventFactory: EventFactory,
  ) {
  }

  public async createEventFromDefeat(game: Game): Promise<void> {
    if (!game.defeatSource) {
      throw new Error('Game defeat source is not set');
    }

    const eventDefinition = await this.getEventDefinitionByIdentifierQueryHandler.handle(
      new GetEventDefinitionByIdentifierQuery('defeat-' + game.defeatSource),
    );

    const event = this.eventFactory.createEventFromGameDefeat(eventDefinition.id, game.id, game.turn);
    await this.eventRepository.save(event);
  }
}
