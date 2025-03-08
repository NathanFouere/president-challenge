import { inject } from '@adonisjs/core';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import EventFactory from '#event/application/factory/event_factory';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IEventRepository from '#event/domain/repository/i_event_repository';
import type Game from '#game/domain/models/game';
import type Election from '#election/domain/model/election';
import { GetEventDefinitionByIdentifierQuery } from '#event/application/queries/get_event_definition_by_identifier_query';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import IGetEventDefinitionByIdentifierQueryHandler
  from '#event/application/queries/i_get_event_definition_by_identifier_query_handler';

@inject()
export default class EventGenerationService {
  constructor(
    private readonly eventFactory: EventFactory,
    private readonly eventRepository: IEventRepository,
    private readonly getEventDefinitionByIdentifierQueryHandler: IGetEventDefinitionByIdentifierQueryHandler,
  ) {
  }

  public async generateEventFromElection(game: Game, election: Election): Promise<void> {
    const eventDefinition = await this.getEventDefinitionByIdentifierQueryHandler.handle(new GetEventDefinitionByIdentifierQuery(
      election.type,
    ));

    const event = this.eventFactory.createEventFromElection(eventDefinition.id, game.id, game.turn, election.id);
    await this.eventRepository.save(event);
  }
}
